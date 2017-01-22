/**
 * @file actions
 * @author hushicai(bluthcy@gmail.com)
 */

import ActionTypes from '../constants/ActionTypes';

export function doFilterRule(domain) {
  return {
    type: ActionTypes.DO_FILTER_RULE,
    domain
  };
}

export function addRule(rule) {
  return {
    type: ActionTypes.ADD_RULE,
    rule
  };
}

export function editRule(rule) {
  return {
    type: ActionTypes.EDIT_RULE,
    rule
  };
}

export function deleteRule(id) {
  return {
    type: ActionTypes.DELETE_RULE,
    id
  };
}
