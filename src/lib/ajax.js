import fetch from 'isomorphic-fetch';
import UrlSearchParams from 'url-search-params';

function stringify(params = {}) {
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

// post json
export function post(options = {}) {
  return fetch(
    options.url,
    {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: stringify(options.data)
    }
  ).then(response => {
    return response.json()
  }).catch((ex) => {
    // parsed failed
  });
}

export function get(options = {}) {}

// upload file
export function upload(options = {}) {}

// post form
export function form(options = {}) {}
