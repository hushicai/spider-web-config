/**
 * @file client
 * @author hushicai(bluthcy@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {routerMiddleware} from 'react-router-redux';
import configureStore from './store/configureStore';

const middlewares = [
  routerMiddleware(browserHistory)
];
const store = configureStore(window.__INITIAL_STATE__, middlewares);
const history = syncHistoryWithStore(browserHistory, store);
const mounter = document.getElementById('root');

let render = () => {
  const routes = require('./routes').default;

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    mounter
  );
};

render();

// Setup hot module replacement
if (module.hot) {
  module.hot.accept('./routes/index', () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(mounter)
      render()
    })
  );
}
