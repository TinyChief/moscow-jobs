import { createContext, useContext, useEffect, useState } from "react";
import { apiService } from "../services/useApiService";

const ApplicationContext = createContext({
  send: false,
  status: '',
  score: 0,
  makeApplication: async () => {},
  getApplicationStatus: async () => {},
});

export const ApplicationProvider = ({ children }) => {
  const [state, setState] = useState({
    send: false,
    status: null,
    score: null,
  });

  const makeApplication = async (directions, busyness) => {
    await apiService.postMyApplication({
      directions,
      busyness,
    });
  };

  const getApplicationStatus = async () => {
    try {
      const { data } = await apiService.getMyApplication();

      setState({
        send: true,
        status: data.status,
        score: data.score_percentage,
      });
    } catch (error) {
      if (error.status === 404) {
        setState((preValue) => ({ ...preValue, send: false }));
      } else {
        console.error("get application status error", error);
      }
    }
  };

  useEffect(() => {
    getApplicationStatus();
  }, []);

  return (
    <ApplicationContext.Provider
      value={{ ...state, makeApplication, getApplicationStatus }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => useContext(ApplicationContext);
