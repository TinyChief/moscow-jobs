import { createContext, useEffect, useReducer } from "react";
import Loading from "@/app/components/Loading";
import { apiService } from "../services/useApiService";

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false,
};

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

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

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const response = await apiService.login({ email, password });
    const { user } = response.data;

    dispatch({ type: "LOGIN", payload: { user } });
  };

  const register = async (email, username, password) => {
    const response = await apiService.register({ email, username, password });
    const { user } = response.data;

    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiService.getProfile();
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: true, user: data.user },
        });
      } catch (err) {
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null },
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
