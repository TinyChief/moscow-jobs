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

    // if (originalConfig.url !== "/token/create/" && err.response) {
    //   // Access Token was expired
    //   if (err.response.status === 401 && !originalConfig._retry) {
    //     originalConfig._retry = true;

    //     try {
    //       await refreshToken();

    //       return axiosInstance(originalConfig);
    //     } catch (_error) {
    //       return Promise.reject(_error);
    //     }
    //   }
    // }

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
      request_name: "Стажер программист",
      organization_name: "Технополис",
      status: "WAITING",
    },
    {
      id: 2,
      request_id: 2,
      request_name: "Стажер разнорабочий",
      organization_name: "Метро москвы",
      status: "ACCEPTED",
    },
  ],
});

const getMySchoolStatus = async () =>
  fetchService.get("/candidates/me/school/");
const getMyTestStatus = async () => fetchService.get("/candidates/me/test/");
const getMyCaseStatus = async () => fetchService.get("/interns/me/case/");
const getCandidatesStatistics = async () => {
  return fetchService.get("/statistics/candidates/");
};

const getInternsStatistics = async () => {
  // return {
  //   data: {
  //     people: {
  //       total: 332,
  //     },
  //     age: {
  //       between18And25: 5,
  //       between25And35: 20,
  //       average: 24,
  //     },
  //     gender: {
  //       male: 800,
  //       female: 123,
  //     },
  //     directions: [
  //       { name: "HR", value: "231" },
  //       { name: "IT", value: "255" },
  //       { name: "ГЭ", value: "100" },
  //       { name: "КГС", value: "143" },
  //       { name: "МГ", value: "300" },
  //       { name: "ПП", value: "234" },
  //       { name: "СГ", value: "532" },
  //     ],
  //     education: [
  //       { name: "среднее профессиональное образование", value: "231" },
  //       { name: "высшее образование - бакалавриат", value: "255" },
  //       {
  //         name: "высшее образование - специалитет, магистратура",
  //         value: "100",
  //       },
  //     ],
  //     city: {
  //       moscow: 80,
  //       other: 20,
  //     },
  //     schedule: {
  //       fullTime: 68,
  //       partTime: 32,
  //     },
  //   },
  // };

  return fetchService.get("/statistics/interns/");
};

const getOrganizationsStatistics = async () => {
  // return {
  //   data: {
  //     total_requests_count: 23,
  //     waiting_requests_count: 30,
  //     accepted_requests_count: 53,
  //     declined_requests_count: 21,
  //   },
  // };

  return fetchService.get("/requests/statistics/");
};

const getOrganizationsFullStatistics = async () => {
  // return {
  //   data: [
  //     {
  //       id: 0,
  //       name: 'АНО "Московский спорт"',
  //       total_requests_count: 13,
  //       waiting_requests_count: 10,
  //       accepted_requests_count: 3,
  //       declined_requests_count: 0,
  //     },
  //     {
  //       id: 1,
  //       name: "ГБУ Мостранспроект",
  //       total_requests_count: 9,
  //       waiting_requests_count: 2,
  //       accepted_requests_count: 7,
  //       declined_requests_count: 0,
  //     },
  //     {
  //       id: 2,
  //       name: "Агенство инноваций",
  //       total_requests_count: 15,
  //       waiting_requests_count: 10,
  //       accepted_requests_count: 4,
  //       declined_requests_count: 1,
  //     },
  //   ],
  // };

  return fetchService.get("/organizations/statistics/");
};

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
  getMySchoolStatus,
  getMyTestStatus,
  getMyCaseStatus,
  getCandidatesStatistics,
  getInternsStatistics,
  getOrganizationsStatistics,
  getOrganizationsFullStatistics,
};
