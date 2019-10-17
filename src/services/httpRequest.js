import axios from 'axios';
import { tools } from '../tools/toast';
// ----------------------------- Config Global Axios Interceptor
axios.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error(error);
    tools.toast.error('No data received, please try again');
    return Promise.reject(error);
  }
);
// -----------------------------

const RequestType = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};

const ContentType = {
  ApplicationJson: 'application/json',
  'multipart/form-data': 'multipart/form-data'
};

const DefaultHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json'
};

/**
 * Make Axios Request
 * @param {string} url api relative url should be start with forward slash /
 * @param {object} dataObject body object (auto transform to qs,FormData,json)
 * @param {string} contentType Content-Type
 * @param {string} requestType Request-Type
 * @returns {Promise} AxiosPromise AxiosPromise
 */
const Request = async (url, dataObject, contentType, requestType) => {
  // generate approperate body content
  let body = null;
  switch (contentType) {
    case ContentType.ApplicationJson:
      body = JSON.stringify(dataObject);
      break;
    case ContentType['multipart/form-data']:
      body = new FormData();
      for (let key in dataObject) {
        body.append(key, dataObject[key]);
      }
      break;
    default:
      break;
  }

  // log just in Dev mode
  if (process.env.NODE_ENV === 'development') {
    console.log('request type:', requestType);
    console.log('request url:', url);
    console.log('request body:', body);
  }

  // generate axios configurations
  const configurations = {
    method: requestType,
    url: url,
    async: true,
    crossDomain: true,
    timeout: 15000,
    responseType: 'json',
    headers: { ...DefaultHeaders, 'Content-Type': ContentType },
    validateStatus: function(status) {
      return status >= 200 && status < 300; // default true=resolve,false=reject promise
    }
  };

  // attach body to these Verbs
  switch (requestType) {
    case RequestType.POST:
    case RequestType.PUT:
    case RequestType.PATCH:
      configurations.data = body;
      break;
    default:
      break;
  }

  return axios(configurations);
};

/**
 * extract axios data field from response otherwise return null
 * @param {*} response response from axios result
 */
const asEntityOrNull = response => {
  if (response && response.data) {
    return response.data;
  }
  return null;
};

//----------- Export
// This Object Contains Request,ContentType and RequestType to create easy access point for all of them.
const httpRequest = {
  Request,
  ContentType,
  RequestType,
  asEntityOrNull
};
export { httpRequest };
