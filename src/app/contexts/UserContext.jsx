import { createContext, useEffect, useReducer } from "react";
import { apiService } from "../services/useApiService";
import {
  packUser,
  packUserInfo,
  unpackUser,
  unpackUserInfo,
} from "../utils/pack";
import Loading from "@/app/components/Loading";
import useAuth from "../hooks/useAuth";

const initialState = {
  user: null,
  userInfo: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { user } = action.payload;
      return { ...state, user };
    }

    case "SET_INFO": {
      const { info } = action.payload;
      return { ...state, userInfo: info };
    }

    default:
      return state;
  }
};

const UserContext = createContext({
  ...initialState,
  getInfo: async () => {},
  updateUserData: async () => {},
  updateUserInfo: async () => {},
});

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { logout } = useAuth();

  const getInfo = async () => {
    const response = await apiService.getInfo();

    const info = unpackUserInfo(response.data);

    dispatch({ type: "SET_INFO", payload: { info } });
  };

  const updateUserData = async (newUserData) => {
    const response = await apiService.updateUserData(packUser(newUserData));
    const user = unpackUser(response.data);

    dispatch({
      type: "INIT",
      payload: {
        user,
      },
    });
  };

  const updateUserInfo = async (newUserInfo) => {
    const response = await apiService.updateUserInfo(packUserInfo(newUserInfo));
    const info = unpackUserInfo(response.data);

    dispatch({ type: "SET_INFO", payload: { info } });
  };

  async function getProfile() {
    const response = await apiService.getProfile();
    const user = unpackUser(response.data);

    dispatch({
      type: "INIT",
      payload: {
        user,
      },
    });
  }

  useEffect(() => {
    (async () => {
      try {
        await getProfile();
      } catch (err) {
        console.error(err);
        logout()
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.user) return <Loading />;

  return (
    <UserContext.Provider
      value={{ ...state, getInfo, updateUserData, updateUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
