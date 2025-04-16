import httpClient from './httpClient';

export const ApiService = {
  get: <T>(url: string, params?: any): Promise<T> => {
    return httpClient.get<T>(url, { params }).then((response) => response.data);
  },
  post: <T>(url: string, data?: any): Promise<T> => {
    return httpClient.post<T>(url, data).then((response) => response.data);
  },
  put: <T>(url: string, data?: any): Promise<T> => {
    return httpClient.put<T>(url, data).then((response) => response.data);
  },
  delete: <T>(url: string): Promise<T> => {
    return httpClient.delete<T>(url).then((response) => response.data);
  },
  patch: <T>(url: string, data?: any): Promise<T> => {
    return httpClient.patch<T>(url, data).then((response) => response.data);
  },
};
