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

const initialState = {
  domain: '',
  loading: 0,
  ruleList: [
    {
      id: 'rule:hushicai.com:test',
      domain: 'hushicai.com'
    }
  ]
};
const store = configureStore(initialState);
const router = express.Router();

// https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.kh5w12as3
// https://github.com/facebook/react/issues/1739

router.get('*', (req, res, next) => {
  match({routes: routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
    } else if (redirectLocation) {
    } else if (renderProps) {
      const body = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const state = store.getState();
      const html = ReactDOMServer.renderToStaticMarkup(<Html children={body} state={state} />);

      res.status(200).send(html);
    }
  });
});


module.exports = router;
