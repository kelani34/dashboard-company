// setup methods for external use of Axios
import axios from 'axios';

import { cookieExists } from 'Utils/cookies';
// import qs from "qs";

// axios global
export const baseURL = process.env.REACT_APP_API_URL;
export const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// axios api instance
const instance = axios.create({
  baseURL,
  headers,
  withCredentials: true,
});

// making the api request
const request = async (url: string, requestData: object = {}, requestType = 'get', options = {}) =>
  await instance[requestType](url, requestData, options);

// await axios.get('https://httpbin.org/get', { params: { answer: 42 } });

// const request = async (url: string, requestData: object = {}, requestType = 'get', callBack = defaultCallBack) =>
//   await addCatch(instance[requestType](url, requestData), callBack);

// default error handling
// const defaultCallBack = (err: any) => {
//   console.log(err);
// };

// add an error handling callback to existing promise
// const addCatch = (promise: any, callBack: any) => {
//   return promise.catch((err: any) => {
//     callBack(err);
//   });
// };

// Perform a get and return the data
const get = async (url: string, params = {}) => await request(url, params);
// const get = async (url: string, params: object) =>
//   await instance.get(url, {
//     params,
//     paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
//   });
const post = async (url: string, data: object, options?: object) => await request(url, data, 'post', options);
const put = async (url: string, data: object, options?: object) => await request(url, data, 'put', options);

// delete is a key word and cannot be used in strict mode. Hence deleteFn
const deleteFn = async (url: string, data = {}, options = {}) => await request(url, data, 'delete', options);
// Set the Authorization token
const setAuthorizationToken = (token: string = '') => {
  instance.defaults.headers.Authorization = `Bearer ${token}`;
};

// Remove the Authorization token
const resetAuthorizationToken = () => {
  // enable this to have a new token on each login
  delete instance?.defaults?.headers?.Authorization;
};

// Get the initial headers and cookies setup for csrf
const csrfHeader = async () => {
  await request(process.env.REACT_APP_SANCTUM_URL);
  // Check for the cookie XSRF-TOKEN
  return cookieExists('XSRF-TOKEN');
};

export const Api = {
  get,
  post,
  put,
  delete: deleteFn,
  setAuthorizationToken,
  resetAuthorizationToken,
  csrfHeader,
};
