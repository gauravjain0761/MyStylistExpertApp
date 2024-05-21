import axios from 'axios';
import {appConfig} from '../../config';

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
        // console.log("response-->", response);
        if (response.status === 200 || response.status === 201) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        console.log('error?.response?', error?.response);
        if (error?.response?.status === 401) {
          //   clearAsync();
          //   errorToast(error?.response?.data?.message);
          //   navigationRef?.current?.reset({
          //     index: 1,
          //     routes: [{name: screenName.Login}],
          //   });
        } else {
          // errorToast(error?.response?.data?.message);
        }
        reject(error);
      });
  });
