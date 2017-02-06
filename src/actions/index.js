/**
 * @file actions
 * @author hushicai(bluthcy@gmail.com)
 */

import {
  DO_FILTER_RULE,
  ADD_RULE,
  EDIT_RULE,
  DELETE_RULE,
  SHOW_LOADING,
  HIDE_LOADING
} from '../constants/ActionTypes';

export function doFilterRule(domain) {
  return {
    type: DO_FILTER_RULE,
    domain
  };
}

export function addRule(rule) {
  return {
    type: ADD_RULE,
    rule
  };
}

export function editRule(rule, id) {
  return {
    type: EDIT_RULE,
    rule,
    id
  };
}

export function deleteRule(id) {
  return {
    type: DELETE_RULE,
    id
  };
}

export function showLoading() {
  return {
    type: SHOW_LOADING
  };
}

export function hideLoading() {
  return {
    type: HIDE_LOADING
  }
}
