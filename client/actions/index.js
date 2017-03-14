/**
 * @file actions
 * @author hushicai(bluthcy@gmail.com)
 */

import {push} from 'react-router-redux';
import {post} from '../lib/ajax';

// action types;
export const DO_FILTER_RULE = 'DO_FILTER_RULE';
export const ADD_RULE = 'ADD_RULE';
export const EDIT_RULE = 'EDIT_RULE';
export const DELETE_RULE = 'DELETE_RULE';
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

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

    return post({
      url: '/api-rule/add',
      data: {
        rule: rule
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

    return post({
      url: '/api-rule/edit',
      data: {
        id: id,
        rule: rule
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
