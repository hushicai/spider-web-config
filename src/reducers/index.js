/**
 * @file reducers
 * @author hushicai(bluthcy@gmail.com)
 */

import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import domain from './domain';
import ruleList from './ruleList';

export default combineReducers({
  domain,
  ruleList,
  routing
});
