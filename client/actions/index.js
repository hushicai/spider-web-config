/**
 * @file actions
 * @author hushicai(bluthcy@gmail.com)
 */

import {push} from 'react-router-redux';
import * as ajax from '../lib/ajax';

// action types;
export const GET_RULE_LIST_DONE = 'GET_RULE_LIST_DONE';
export const GET_RULE_DONE = 'GET_RULE_DONE';
export const DO_FILTER_RULE = 'DO_FILTER_RULE';
export const ADD_RULE_DONE = 'ADD_RULE_DONE';
export const EDIT_RULE_DONE = 'EDIT_RULE_DONE';
export const DELETE_RULE_DONE = 'DELETE_RULE_DONE';
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

export function getRuleList () {
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

export function getRule (id) {
  return (dispatch) => {
    return ajax.get('/api-rule/detail', {
      data: {
        id: id
      }
    }).then((data) => {
      dispatch({
        type: GET_RULE_DONE,
        rule: data
      });
    });
  };
}

// action creators
export function doFilterRule (domain) {
  return {
    type: DO_FILTER_RULE,
    domain
  };
}

export function addRule (rule) {
  return function(dispatch) {
    dispatch(showLoading());

    return ajax.post('/api-rule/add', {
      data: {
        rule: JSON.stringify(rule)
      }
    }).then(() => {
      dispatch(hideLoading());
      dispatch({
        type: ADD_RULE_DONE,
        rule
      });
      dispatch(push('/rule'));
    });
  }
}

export function editRule (id, rule) {
  return (dispatch) => {
    dispatch(showLoading());

    return ajax.post('/api-rule/edit', {
      data: {
        id: id,
        rule: JSON.stringify(rule)
      }
    }).then(() => {
      dispatch(hideLoading());
      dispatch({
        type: EDIT_RULE_DONE,
        id,
        rule
      });
      dispatch(push('/rule'));
    });
  };
}

export function deleteRule (id) {
  return (dispatch) => {
    dispatch(showLoading());

    return ajax.post('/api-rule/delete', {
      data: {
        id: id
      }
    }).then(() => {
      dispatch({
        type: DELETE_RULE_DONE,
        id: id
      });
      dispatch(hideLoading());
    });
  };
}

export function showLoading () {
  return {
    type: SHOW_LOADING
  };
}

export function hideLoading () {
  return {
    type: HIDE_LOADING
  }
}
