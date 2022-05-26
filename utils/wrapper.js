const { default: axios } = require("axios")

module.exports = function Wrapper(config) {
  return function (request) {
    try {
      const options = {
        baseURL: config.baseURL,
        url: request.path,
        method: request.method,
        params: request.query,
        headers: { Authorization: `Bearer ${config.key}` }
      }

      let activePromise
      const axiosPromise = () => {
        if (activePromise) return activePromise;
        activePromise = new Promise((resolve, reject) => {
          axios.request(options).then(response => {
            currentPage++;
            return resolve(response.data)
          })
            .catch(({ response, code, message }) => {
              const error = new Error();
              if (response) {
                error.name = 'WoodCoreAPIError';
                error.code = response.status;
                if (typeof response.data.message === "string") error.message = response.data.message;
                else error.message = `${response.data.message.message}: ${response.data.message.error}`
                return reject(error)
              }
              error.code = code;
              error.message = message;
              reject(error)
            })
            .finally(() => {
              activePromise = null
            })
        })
        return activePromise
      }

      let currentPage = request.query?.currentPage || 1;
      const asyncIterator = {
        next: async () => {
          if (request.method !== "get") return Promise.resolve({ done: true });
          Object.assign(options.params, { page: currentPage, perPage: options.params.perPage || 15 })
          const response = await axiosPromise()
          if (response.data.meta?.totalPage === response.data.meta?.currentPage || !response.data.meta?.totalPage) {
            return Promise.resolve({ done: true });
          }
          return Promise.resolve({ value: response, done: false });
        }
      };

      const asyncIterable = {
        [Symbol.asyncIterator]: () => asyncIterator
      };

      return Object.assign(axiosPromise(), asyncIterable);
    } catch (error) {
      throw new Error(error)
    }
  }
}