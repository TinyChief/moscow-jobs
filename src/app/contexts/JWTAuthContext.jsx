import { createContext, useEffect, useReducer } from "react";
import Loading from "@/app/components/Loading";
import * as jose from "jose";
import { apiService, axiosInstance } from "../services/useApiService";
import { packUser } from "../utils/pack";

/**
 * @typedef state
 * @property {{name: string}} user
 *
 */

/** @type {{user: {name: string, surname: string, role: string, secondname: string}}} */
const initialState = {
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
      const { isAuthenticated } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true };
    }

    case "LOGIN": {
      return { ...state, isAuthenticated: true };
    }

    case "LOGOUT": {
      return { ...state, isAuthenticated: false };
    }

    case "REGISTER": {
      return { ...state, isAuthenticated: true };
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
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const { data } = await apiService.login({ email, password });
    if (data.access) {
      setSession(data.access);

      dispatch({ type: "LOGIN" });
    } else {
      console.log("no auth_token");
      // setLoggedIn(false);
    }
  };

  const register = async (userData) => {
    const response = await apiService.register(packUser(userData));
    const user = response.data;

    dispatch({ type: "REGISTER" });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
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
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
          },
        });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <Loading />;

  return (
    <AuthContext.Provider
      value={{ ...state, method: "JWT", login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
