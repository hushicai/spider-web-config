/**
 * @file store
 * @author hushicai(bluthcy@gmail.com)
 */

import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import {hashHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

const configureStore = (preloadedState) => {
  const middlewares = [
    thunk,
    routerMiddleware(hashHistory)
  ];
  const createStoreEnhancer = applyMiddleware(...middlewares)(createStore);
  const store = createStoreEnhancer(reducers, preloadedState);

  if (__DEV__) {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        const nextReducers = require('../reducers').default
        store.replaceReducer(nextReducers)
      })
    }
  }

  return store;
};

export default configureStore;
