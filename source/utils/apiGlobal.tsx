import axios from 'axios';
import {appConfig} from '../../config';
import {NativeToast} from './toast';

interface makeAPIRequestProps {
  method?: any;
  url?: any;
  data?: any;
  headers?: any;
  params?: any;
}

export const makeAPIRequest = ({
  method,
  url,
  data,
  headers,
  params,
}: makeAPIRequestProps) =>
  new Promise((resolve, reject) => {
    const option = {
      method,
      baseURL: appConfig?.mainDomain,
      url,
      data,
      headers,
      params,
    };
    axios(option)
      .then(response => {
        // console.log('response-->', response);
        if (response?.status === 200 || response?.status === 201) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        console.log('error?.response?', error?.response);
        reject(error);
      });
  });
