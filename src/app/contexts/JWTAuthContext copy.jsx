import { createContext, useEffect, useReducer } from "react";
import Loading from "@/app/components/Loading";
import axios from "axios";
import * as jose from "jose";
import { apiService, axiosInstance } from "../services/useApiService";
import { packUser, unpackUser, unpackUserInfo } from "../utils/pack";

/**
 * @typedef state
 * @property {{name: string}} user
 *
 */

/** @type {{user: {name: string, surname: string, role: string, secondname: string}}} */
const initialState = {
  user: null,
  userInfo: null,
  isInitialised: false,
  isAuthenticated: false,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jose.decodeJwt(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case "LOGIN": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }

    case "REGISTER": {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    case "SET_INFO": {
      const { info } = action.payload;
      return { ...state, userInfo: info };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  getInfo: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const { data } = await apiService.login({ email, password });
    if (data.access) {
      setSession(data.access);

      const { data: data2 } = await apiService.getProfile();

      dispatch({ type: "LOGIN", payload: { user: unpackUser(data2) } });
    } else {
      console.log("no auth_token");
      // setLoggedIn(false);
    }
  };

  const register = async (userData) => {
    const response = await apiService.register(packUser(userData));
    const user = response.data;

    dispatch({ type: "REGISTER", payload: { user: unpackUser(user) } });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const getInfo = async () => {
    const response = await apiService.getInfo();

    const info = unpackUserInfo(response.data);

    dispatch({ type: "SET_INFO", payload: { info } });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          // const response = await apiService.getProfile();
          // const user = unpackUser(response.data);

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <Loading />;

  return (
    <AuthContext.Provider
      value={{ ...state, method: "JWT", login, logout, register, getInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
