import axios, { AxiosError, AxiosResponse, HttpStatusCode, InternalAxiosRequestConfig } from 'axios';
import Http from './Http';
import { useEffect } from 'react';

const headers = {
  'Content-Type': 'application/json',
};

// const axiosInstance = axios.create();

const axiosInstance = axios.create();

const httpAxios: Http = {
  get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.get(path, {
      ...config,
      params: params,
      headers,
    });
    return response.data as T;
  },
  post: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.post(path, { ...params }, { ...config, headers });
    return response.data as T;
  },
  put: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.put(path, { ...params }, { ...config, headers });
    return response.data as T;
  },
  patch: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.patch(path, { ...params }, { ...config, headers });
    return response.data as T;
  },
  delete: async <T>(path: string, params?: any, config?: any) => {
    const response = await axios.delete(path, {
      ...config,
      params: params,
      headers,
    });
    return response.data as T;
  },
  postFormData: async <T>(path: string, params?: FormData, config?: any) => {
    const response = await axios.post(path, params, { ...config, headers });
    return response.data as T;
  },
};

const AxiosInterceptor = ({ children }: any) => {
  useEffect(() => {
    const onRequest = async (request: InternalAxiosRequestConfig) => {
      if (request.url !== '/api/v1/oauth2/token') {
        request.headers.setAuthorization(`Bearer ${localStorage.access_token}`);
      }

      return request;
    };

    const onRequestError = (error: AxiosError) => {
      return Promise.reject(error);
    };

    const onResponse = (response: AxiosResponse) => {
      return response;
    };

    const onResponseError = (error: AxiosError) => {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
      }

      return Promise.reject(error);
    };

    const responseInterceptor = axiosInstance.interceptors.response.use(onResponse, onResponseError);
    const requestInterceptor = axiosInstance.interceptors.request.use(onRequest, onRequestError);

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  return children;
};
export { httpAxios, AxiosInterceptor };
