import axios from "axios";

export const useFetch = () => {
  const handleFetch = async (url, body, options = {}) => {

    // const requestBody = request?.body
    //   ? request.body instanceof FormData
    //     ? { ...request, data: request.body }
    //     : { ...request, data: JSON.stringify(request.body) }
    //   : request;

    // const headers = {
    //   ...(options.headers
    //     ? options.headers
    //     : body && body instanceof FormData
    //     ? {}
    //     : { "Content-type": "application/json" }),
    // };

    // console.log(options)

    return axios(url, { ...options, data: body })
      .then((response) => {
        if (response.status !== 200) throw response;

        // const contentType = response.headers.get("content-type");
        // const contentDisposition = response.headers.get("content-disposition");

        // const headers = response.headers;

        // const result =
        //   contentType &&
        //   (contentType?.indexOf("application/json") !== -1 ||
        //     contentType?.indexOf("text/plain") !== -1)
        //     ? response.json()
        //     : contentDisposition?.indexOf("attachment") !== -1
        //     ? response.blob()
        //     : response;

        return response;
      })
      .catch(async (err) => {
        console.log(err);
        // const contentType = err.headers.get("content-type");

        // const errResult =
        //   contentType && contentType?.indexOf("application/problem+json") !== -1
        //     ? await err.json()
        //     : err;

        throw {
          status: err.response.status,
          message: err.response.data.message
        };
      });
  };

  return {
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
};
