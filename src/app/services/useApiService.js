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

const getMyApplication = () => fetchService.get("/candidates/me/request/");
const postMyApplication = (params) =>
  fetchService.post("/candidates/me/request/", params);
const getCandidateApplications = (type, page = 0) => {
  const recommended =
    type === ApplicationTypes.ALL
      ? ""
      : "&recommended=" + (type === ApplicationTypes.RECOMMENDED);
  return fetchService.get(
    `/candidates/requests/?page=${page}&size=10${recommended}`
  );
};

const getDepartmentsApplications = (page = 0, size = 10) => {
  return fetchService.get(
    `/requests/?page=${page}&size=${size}&status=WAITING`
  );
};

const acceptCandidateApplication = (id) =>
  fetchService.post(`/candidates/${id}/accept/`);

const declineCandidateApplication = (id) =>
  fetchService.post(`/candidates/${id}/decline/`);

const refreshToken = async () => {
  const rs = await fetchService.post("/token/refresh/", {
    refresh: TokenService.getLocalRefreshToken(),
  });

  const { access } = rs.data;
  TokenService.updateLocalAccessToken(access);
};

const getUserById = (id) => fetchService.get(`/users/${id}/`);
const getUserInfoById = (id) => fetchService.get(`/users/${id}/info/`);
const getDepartmentApplicationById = (id) =>
  fetchService.get(`/requests/${id}/`);

const acceptDepartmentApplication = (id) =>
  fetchService.post(`/requests/${id}/accept/`);

const declineDepartmentApplication = (id) =>
  fetchService.post(`/requests/${id}/decline/`);

const getMyDepartment = () => fetchService.get("/organizations/my/");
const createDepartment = (params) =>
  fetchService.post("/organizations/my/", params);
const updateDepartment = (params) =>
  fetchService.put("/organizations/my/", params);
const createDepartmentApplication = (params) =>
  fetchService.post("/organizations/my/requests/", params);
const getMyDepartmentApplications = () =>
  fetchService.get("/organizations/my/requests/");

const getOrganizationById = (id) => fetchService.get(`/organizations/${id}/`);
const editDepartmentApplication = (params) =>
  fetchService.put(`/organizations/my/requests/${params.id}/`, params);

const deleteDepartmentApplication = (id) =>
  fetchService.delete(`/organizations/my/requests/${id}/`);

const applyToJob = (id) => fetchService.post(`/requests/${id}/interns/`);
// const getMyJobApplications = () => fetchService.post(`/requests/my/`)
const getMyJobApplications = async () => ({
  data: [
    {
      id: 1,
      request_id: 1,
      request_name: 'Стажер программист',
      organization_name: 'Технополис',
      status: "WAITING",
    },
    {
      id: 2,
      request_id: 2,
      request_name: 'Стажер разнорабочий',
      organization_name: 'Метро москвы',
      status: "ACCEPTED",
    },
  ],
});

export const apiService = {
  getProfile,
  login,
  getInfo,
  register,
  updateUserData,
  updateUserInfo,
  getMyApplication,
  postMyApplication,
  refreshToken,
  getCandidateApplications,
  getDepartmentsApplications,
  getDepartmentApplicationById,
  acceptApplication: acceptCandidateApplication,
  declineApplication: declineCandidateApplication,
  getUserById,
  getUserInfoById,
  acceptDepartmentApplication,
  declineDepartmentApplication,
  getMyDepartment,
  createDepartment,
  updateDepartment,
  createDepartmentApplication,
  getMyDepartmentApplications,
  getOrganizationById,
  editDepartmentApplication,
  deleteDepartmentApplication,
  applyToJob,
  getMyJobApplications,
};
