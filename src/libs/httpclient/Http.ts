export default interface Http {
  get: <T>(path: string, params?: Record<string, any>, config?: any) => Promise<T>;
  post: <T>(path: string, params?: Record<string, any>, config?: any) => Promise<T | any>;
  patch: <T>(path: string, params?: Record<string, any>, config?: any) => Promise<T | any>;
  put: <T>(path: string, params?: Record<string, any>, config?: any) => Promise<T | any>;
  delete: <T>(path: string, data?: any, params?: any, config?: any) => Promise<T | any>;
  postFormData: <T>(path: string, params?: FormData, config?: any) => Promise<T | any>;
}
