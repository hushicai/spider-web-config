/**
 * @file reducers
 * @author hushicai(bluthcy@gmail.com)
 */

import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import domain from './domain';
import ruleList from './ruleList';
import loading from './loading';

export default combineReducers({
  domain,
  loading,
  ruleList,
  routing
});
