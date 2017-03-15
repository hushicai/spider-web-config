/**
 * @file store
 * @author hushicai(bluthcy@gmail.com)
 */

import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

const configureStore = (preloadedState = {}, middlewares = []) => {
  middlewares = [
    thunk,
    ...middlewares,
    logger
  ];
  const createStoreEnhancer = applyMiddleware(...middlewares)(createStore);
  const store = createStoreEnhancer(reducers, preloadedState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducers = require('../reducers').default
      store.replaceReducer(nextReducers)
    })
  }

  return store;
};

export default configureStore;
