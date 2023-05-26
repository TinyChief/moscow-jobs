import React, { createContext, useContext } from "react";
import axios from "axios";
import { ApiError } from "../utils/errors";

const ApiContext = createContext();

const {
  VITE_API_URL: API_URL,
  VITE_FAKE_DB: USE_FAKE_DB,
  VITE_API_PREFIX: API_PREFIX,
  mode,
} = import.meta.env;

const baseUrl = mode === "production" ? API_PREFIX : API_URL.concat(API_PREFIX);

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiProvider = ({ children }) => {
  const handleFetch = async (url, body, options = {}) => {
    return axiosInstance(url, { ...options, data: body })
      .then((response) => {
        if (response.status >= 400) throw response;

        return response;
      })
      .catch(async (err) => {
        if (err.response) {
          throw new ApiError(err.response.status, err.response.data);
        } else if (err.code) {
          throw new ApiError("", err.message);
        }
      });
  };

  const fetchService = {
    get: async (url, body, request) => {
      return handleFetch(url, body, { ...request, method: "get" });
    },
    post: async (url, body, request) => {
      return handleFetch(url, body, { ...request, method: "post" });
    },
    put: async (url, body, request) => {
      return handleFetch(url, body, { ...request, method: "put" });
    },
    patch: async (url, body, request) => {
      return handleFetch(url, body, { ...request, method: "patch" });
    },
    delete: async (url, body, request) => {
      return handleFetch(url, body, { ...request, method: "delete" });
    },
  };

  const login = (params) => fetchService.post(`/token/create/`, params);
  const register = (params) => fetchService.post(`/registration/`, params);
  const getProfile = () => fetchService.get(`users/me/`);
  const getInfo = () => fetchService.get(`users/me/info/`);
  const updateUserData = (params) => fetchService.put(`users/me/`, params);
  const updateUserInfo = (params) =>
    fetchService.post(`users/me/info/`, params);
  const getJobs = () => fetchService.get(`/api/jobs`);
  const getFullJob = (id) => fetchService.get(`/api/jobs/${id}`);

  return (
    <ApiContext.Provider
      value={{
        login,
        register,
        getProfile,
        getInfo,
        updateUserData,
        updateUserInfo,
        getJobs,
        getFullJob,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
