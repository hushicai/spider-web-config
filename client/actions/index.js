/**
 * @file actions
 * @author hushicai(bluthcy@gmail.com)
 */

import {push} from 'react-router-redux';
import {post} from '../lib/ajax';

import {
  DO_FILTER_RULE,
  ADD_RULE,
  ADD_RULE_SUCCESS,
  EDIT_RULE,
  EDIT_RULE_SUCCESS,
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
  return function(dispatch) {
    dispatch(showLoading());

    return post({
      url: '/addRule',
      data: {
        rule: rule
      }
    }).then(() => {
      dispatch(hideLoading());
      dispatch(addRuleSuccess(rule));
      dispatch(push('/rule'));
    });
  }
}

export function addRuleSuccess(rule) {
  return {
    type: ADD_RULE_SUCCESS,
    rule
  }
}

export function addRuleFail() {}

export function editRule(rule, id) {
  return (dispatch) => {
    dispatch(showLoading());

    return post({
      url: '/editRule',
      data: {
        id: id,
        rule: rule
      }
    }).then(() => {
      dispatch(hideLoading());
      dispatch(editRuleSuccess(rule, id));
      dispatch(push('/rule'));
    });
  };
}

export function editRuleSuccess(rule, id) {
  return {
    type: EDIT_RULE_SUCCESS,
    rule,
    id
  };
}

export function editRuleFail() {}

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
