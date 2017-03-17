/**
 * @file server side render
 * @author hushicai(bluthcy@gmail.com)
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';

import routes from './routes';
import Html from './components/Html';
import configureStore from './store/configureStore';
import promisify from '../common/promisify';

// https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.kh5w12as3
// https://github.com/facebook/react/issues/1739

const pmatch = promisify(match);

async function _render(renderProps) {
  const store = configureStore();
  const components = renderProps.components;
  const params = renderProps.params;
  const needs = components.reduce((prev, current) => {
    if (current) {
      return (current.needs || []).concat(prev);
    }
    return prev;
  }, []);
  const promises = needs.map((need) => {
    return store.dispatch(need(params));
  });

  try {
    await Promise.all(promises);
  }
  catch (ex) {
    console.log(ex);
  }

  const state = store.getState();
  const body = ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
  const html = ReactDOMServer.renderToStaticMarkup(<Html children={body} state={state} />);

  return html;
}

async function renderHtml (url) {
  try {
    let [redirectLocation, renderProps] = await pmatch({routes: routes, location: url});

    if (redirectLocation) {
      return {
        status: 302,
        location: redirectLocation
      };
    }

    let html = await _render(renderProps);

    return {
      status: 200,
      html: html
    };
  }
  catch (ex) {
    // err
    return {
      status: 500,
      error: ex
    };
  }
}

export default renderHtml;
