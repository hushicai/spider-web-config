/**
 * @file server side render
 * @author hushicai(bluthcy@gmail.com)
 */

import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';

import routes from './routes';
import Html from './components/Html';
import configureStore from './store/configureStore';

const router = express.Router();

// https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.kh5w12as3
// https://github.com/facebook/react/issues/1739

router.get('*', (req, res, next) => {
  console.log(req.url);
  match({routes: routes, location: req.url}, async (err, redirectLocation, renderProps) => {
    if (err) {
    } else if (redirectLocation) {
    } else if (renderProps) {
      const store = configureStore();
      const dispatch = store.dispatch;
      const components = renderProps.components;
      const params = renderProps.params;
      const needs = components.reduce((prev, current) => {
        if (current) {
          return (current.needs || []).concat(prev);
        }
        return prev;
      }, []);
      const promises = needs.map((need) => {
        return dispatch(need(params));
      });
      try {
        let result = await Promise.all(promises);
        const state = store.getState();
        const body = ReactDOMServer.renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const html = ReactDOMServer.renderToStaticMarkup(<Html children={body} state={state} />);

        res.status(200).send(html);
      }
      catch (ex) {
        console.log(ex);
        res.set({'content-type': 'text/html'}).status(500).send(ex || 'Internal Server Error');
      }
    }
  });
});


module.exports = router;
