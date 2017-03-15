/**
 * @file actions
 * @author hushicai(bluthcy@gmail.com)
 */

import {push} from 'react-router-redux';
import * as ajax from '../lib/ajax';

// action types;
export const GET_RULE_LIST_DONE = 'GET_RULE_LIST_DONE';
export const DO_FILTER_RULE = 'DO_FILTER_RULE';
export const ADD_RULE = 'ADD_RULE';
export const EDIT_RULE = 'EDIT_RULE';
export const DELETE_RULE = 'DELETE_RULE';
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

export function getRuleList() {
  return function (dispatch) {
    return ajax.get('/api-rule/list')
      .then((data) => {
        dispatch({
          type: GET_RULE_LIST_DONE,
          data: data
        });
      });
  }
}

// action creators
export function doFilterRule(domain) {
  return {
    type: DO_FILTER_RULE,
    domain
  };
}

export function addRule(rule) {
  return function(dispatch) {
    dispatch(showLoading());

    return ajax.post('/api-rule/add', {
      data: {
        rule: JSON.stringify(rule)
      }
    }).then(() => {
      dispatch(hideLoading());
      dispatch(push('/rule'));
    });
  }
}

export function editRule(rule, id) {
  return (dispatch) => {
    dispatch(showLoading());

    return ajax.post('/api-rule/edit', {
      data: {
        id: id,
        rule: JSON.stringify(rule)
      }
    }).then(() => {
      dispatch(hideLoading());
      dispatch(push('/rule'));
    });
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
