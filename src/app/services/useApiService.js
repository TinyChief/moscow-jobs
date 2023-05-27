import axios from "axios";
import { ApiError } from "../utils/errors";
import TokenService from "./TokenService";
import { ApplicationTypes } from "../utils/utils";

const {
  VITE_API_URL: API_URL,
  VITE_API_PREFIX: API_PREFIX,
  VITE_FAKE_DB: USE_FAKE,
  mode,
} = import.meta.env;

const baseUrl =
  USE_FAKE === "true"
    ? API_PREFIX
    : mode === "production"
    ? API_PREFIX
    : (API_URL || "").concat(API_PREFIX);

console.log(`
baseUrl: ${baseUrl}
mode: ${mode}
`);

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/token/create/" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          await refreshToken();

          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

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
const updateUserInfo = (params) => fetchService.post(`users/me/info/`, params);
const getJobs = () => fetchService.get(`/api/jobs`);
const getFullJob = (id) => fetchService.get(`/api/jobs/${id}`);

const getMyApplication = () => fetchService.get("/candidates/me/request/");
const postMyApplication = () => fetchService.post("/candidates/me/request/");
const getCandidateApplications = (type, page = 0) => {
  const recommended =
    type === ApplicationTypes.ALL
      ? ""
      : "&recommended=" + (type === ApplicationTypes.RECOMMENDED);
  return fetchService.get(
    `/candidates/requests/?page=${page}&size=10${recommended}`
  );
};

const acceptApplication = (id) =>
  fetchService.post(`/candidates/${id}/request/accept/`);

const declineApplication = (id) =>
  fetchService.post(`/candidates/${id}/request/decline/`);

const refreshToken = async () => {
  const rs = await fetchService.post("/token/refresh/", {
    refresh: TokenService.getLocalRefreshToken(),
  });

  const { access } = rs.data;
  TokenService.updateLocalAccessToken(access);
};

const getUserById = (id) => fetchService.get(`/users/${id}/`)
const getUserInfoById = (id) => fetchService.get(`/users/${id}/info/`)

export const apiService = {
  getProfile,
  login,
  getInfo,
  register,
  updateUserData,
  updateUserInfo,
  getJobs,
  getFullJob,
  getMyApplication,
  postMyApplication,
  refreshToken,
  getCandidateApplications,
  acceptApplication,
  declineApplication,
  getUserById,
  getUserInfoById
};
