import axios from "axios";

const handleFetch = async (url, body, options = {}) => {
  return axios(url, { ...options, data: body })
    .then((response) => {
      if (response.status !== 200) throw response;

      return response;
    })
    .catch(async (err) => {
      console.log(err);

      throw {
        status: err.response.status,
        message: err.response.data.message,
      };
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

const login = (params) => fetchService.post(`/api/auth/login`, params);

const register = (params) => fetchService.post(`/api/auth/register`, params);

const getProfile = () => fetchService.get(`/api/auth/profile`);

const getJobs = () => fetchService.get(`/api/jobs`);
const getFullJob = (id) => fetchService.get(`/api/jobs/${id}`);

export const apiService = {
  getProfile,
  login,
  register,
  getJobs,
  getFullJob
};
