const { default: axios } = require("axios")

module.exports = function Wrapper(config) {
  return function (request) {
    try {
      const options = generateOptions(request, config)

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
                if (typeof (response.data && response.data.message) === "string") error.message = response.data.message;
                else if (response.data && response.data.message) error.message = `${response.data.message.message}: ${response.data.message.error}`
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

      let currentPage = (options.params && options.params.page);
      let done = false;
      const asyncIterator = {
        next: async () => {
          if (request.method && request.method.toLowerCase() !== "get") return Promise.resolve({ done: true });
          if (done) return Promise.resolve({ done: true });
          Object.assign(options.params, { page: currentPage })
          const response = await axiosPromise()
          const meta = response.data && response.data.meta
          if (!meta || (meta.totalPage === meta.currentPage) || !meta.totalPage) {
            done = true;
            return Promise.resolve({ value: response, done: false });
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

function generateOptions(request, config) {
  const options = {
    baseURL: config.baseURL,
    url: request.path,
    method: request.method,
    params: request.query,
    headers: { Authorization: `Bearer ${config.key}` }
  }
  if (options.params && (request.method && request.method.toLowerCase() === "get")) {
    if (!options.params.perPage) Object.assign(options.params, { perPage: 10 })
    if (!options.params.page) Object.assign(options.params, { page: 1 })
  }
  return options;
}