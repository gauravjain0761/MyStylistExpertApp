import axios from 'axios';

import {POST, appConfig, endPoints} from '../../config';
import DataAccess, {clearAsync} from '../dataAccess';

const {
  getAsyncToken,
  getAsyncRefreshToken,
  setAsyncToken,
  setAsyncRefreshToken,
} = DataAccess();

const axiosInterceptors = axios.create({
  baseURL: appConfig?.mainDomain,
});

axiosInterceptors.interceptors.request.use(
  async config => {
    const token = await getAsyncToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInterceptors.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    let access_token = await getAsyncToken();
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const resp = await refreshTokenApi();
      if (resp) {
        axiosInterceptors.defaults.headers.common['Authorization'] =
          access_token;
      }
      return axiosInterceptors(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInterceptors;

const refreshTokenApi = async () => {
  let refresh_token = await getAsyncRefreshToken();

  let config = {
    method: POST,
    url: appConfig?.mainDomain + endPoints.auth_refresh_token,
    data: {refreshToken: refresh_token},
  };
  await axios
    .request(config)
    .then(async response => {
      console.log('refreshToken success', response?.data);
      await setAsyncToken(response?.data?.accessToken);
      await setAsyncRefreshToken(response?.data?.refreshToken);
      return response?.data;
    })
    .catch(error => {
      console.log('refreshToken error', error?.response);
      clearAsync();
    });
};
