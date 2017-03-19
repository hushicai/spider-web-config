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

function _renderHtml (store, assets, children = '') {
  const state = store.getState();
  const html = ReactDOMServer.renderToStaticMarkup(
    <Html state={state} assets={assets} children={children}  />
  );

  return html;
}

async function serverSideRender (url, assets) {
  const store = configureStore();

  // 开发模式下，不启用重构模式
  if (process.env.NODE_ENV === 'development') {
    let html = _renderHtml(store, assets);

    return {
      status: 200,
      data: html
    };
  }

  try {
    let [redirectLocation, renderProps] = await pmatch({routes: routes, location: url});

    if (redirectLocation) {
      return {
        status: 302,
        data: redirectLocation
      };
    }

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

    // 等待所有请求
    await Promise.all(promises);

    const children = ReactDOMServer.renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const html = _renderHtml(store, assets, children);

    return {
      status: 200,
      data: html
    };
  }
  catch (ex) {
    console.log('[serverSideRender]', ex);
    // err
    return {
      status: 500,
      data: ex
    };
  }
}

export default serverSideRender;
