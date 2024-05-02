import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

const baseURL = 'https://api.mystylist.in/';

const APICaller: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

APICaller.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

APICaller.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default APICaller;
