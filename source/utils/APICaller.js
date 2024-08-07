import axios from 'axios';
import {appConfig} from '../../config';

const {mainDomain} = appConfig;

const APICaller = (endpoint, method, body, contentType) =>
  axios({
    url: `${mainDomain}/${endpoint}`,
    method: method || 'GET',
    data: body,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': contentType || 'application/json',
    },

    // transformRequest: (body, response) => {
    //   return body;
    // },
    responseType: 'json',
  })
    .then(response => {
      console.log(`response from ${mainDomain}/${endpoint} >> ${response}`);
      return response;
    })
    .catch(error => {
      console.log(`Error from ${mainDomain}/${endpoint}>> ${error}`);

      throw error?.response;
    });

export const DynamicCallerForImage = (
  endpoint,
  method,
  body,
  authorization,
  contentType,
) =>
  axios({
    url: endpoint,
    method: method || 'GET',
    data: body,
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: authorization
        ? `${authorization}`
        : 'WVdzdGVXOTFkSFZpWlMxdGIyUjFiR1ZBZG1scmNtRnQ=',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': contentType || 'application/json',
    },
    transformRequest: (body, response) => {
      return body;
    },
    responseType: 'json',
  })
    .then(response => {
      console.log(`response from ${endpoint} >> ${response}`);
      return response;
    })
    .catch(error => {
      console.log(`Error from ${endpoint}>> ${error}`);
      throw error?.response;
    });

export const DynamicCaller = (
  endpoint,
  method,
  body,
  authorization,
  contentType,
  transform,
) =>
  axios({
    url: `${mainDomain}${endpoint}`,
    method: method || 'GET',
    data: body || undefined,
    headers: {
      'Content-Type': contentType || 'application/json',
      Accept: 'application/json, text/plain, */*',
      Authorization: authorization
        ? `${authorization}`
        : 'WVdzdGVXOTFkSFZpWlMxdGIyUjFiR1ZBZG1scmNtRnQ=',
      'Access-Control-Allow-Origin': '*',
    },
    // transformRequest: (body, response) => {
    //   return JSON.stringify(body);
    // },
    responseType: 'json',
  })
    .then(response => {
      console.log(`response from ${mainDomain}${endpoint} >> ${response}`);
      return response;
    })
    .catch(error => {
      console.log(`Error from ${mainDomain}${endpoint}>> ${error}`);
      throw error?.response;
    });

export default APICaller;
