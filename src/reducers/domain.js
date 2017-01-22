import ActionTypes from '../constants/ActionTypes';

export default function domain(state = '', action) {
  switch (action.type) {
    case ActionTypes.DO_FILTER_RULE:
      return action.domain;
    default:
      return state;
  }
}
