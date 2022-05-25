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
            .catch(reject)
            .finally(() => {
              activePromise = null
            })
        })
        return activePromise
      }

      let currentPage = request.query?.currentPage || 1;
      const asyncIterator = {
        next: async () => {
          // uses the async iterator on only get requests.
          if (request.method.toLowerCase() !== "get") return Promise.resolve({ done: true });
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
      if (error.response) {
        if (typeof error.response.data.message === "string") throw new Error(error.response.data.message)
        throw new Error(`${error.response.data.message.message}: ${error.response.data.message.error}`)
      }
      throw new Error(error)
    }
  }
}