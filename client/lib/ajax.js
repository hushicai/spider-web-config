import fetch from 'isomorphic-fetch';
import UrlSearchParams from 'url-search-params';

import {host, port} from '../../settings';

const defaultHeaders = {
  'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
}

function prefix(url) {
  return `http://${host}:${port}${url}`;
}

function toParams(params = {}) {
  const searchParams = new UrlSearchParams();

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      let value = params[key];

      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }

      searchParams.set(key, value);
    }
  }

  return searchParams;
}

function request(url, options = {}) {
  url = prefix(url);

  options = Object.assign({headers: defaultHeaders}, options);

  console.log(`fetching \`${url}\`...`)

  return fetch(url, options)
    .then(res => res.json())
    .then(json => {
      // reject
      if (json.code) {
        throw '系统异常，请稍候重试';
      }

      console.log(`fetch \`${url}\` done...`)

      // resolve
      return json.data;
    })
    .catch(ex => {
      console.log(`fetch \`${url}\` failed...`);
      // failed
      return ex;
    });
}

// post json
export function post(url, options = {}) {
  options = Object.assign({method: 'POST'}, options);
  options.body = toParams(options.data);

  return request(url, options);
}

export function get(url, options = {}) {
  options = Object.assign({method: 'GET'}, options);

  const s = toParams(options.data).toString();

  url = s ? (url + '?' + s) : url;

  delete options.data;

  return request(url, options);
}

// upload file
export function upload(options = {}) {}

// post form
export function form(options = {}) {}
