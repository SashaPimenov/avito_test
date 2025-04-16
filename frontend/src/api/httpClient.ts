import axios, { CancelTokenSource } from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8080/api/v1';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let currentRequestCancelToken: CancelTokenSource | null = null;

// NOTE: Отмена запроса при смене URL
httpClient.interceptors.request.use(
  (config) => {
    if (currentRequestCancelToken) {
      currentRequestCancelToken.cancel('Запрос отменен из-за смены URL');
    }
    currentRequestCancelToken = axios.CancelToken.source();
    config.cancelToken = currentRequestCancelToken.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data !== undefined) {
      return {
        ...response,
        data: response.data.data,
      };
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default httpClient;
