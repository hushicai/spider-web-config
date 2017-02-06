/**
 * @file app
 * @author hushicai(bluthcy@gmail.com)
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {syncHistoryWithStore} from 'react-router-redux';
import {hashHistory} from 'react-router';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import './styles/app.scss';

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
const history = syncHistoryWithStore(hashHistory, store);
const mounter = document.getElementById('root');

let render = () => {
  const routes = require('./routes').default;

  ReactDOM.render(
    <Root
      store={store}
      history={history}
      routes={routes}
    />,
    mounter
  );
};

if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, mounter)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error)
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(mounter)
        render()
      })
    );
  }
}

render();
