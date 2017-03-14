import {DO_FILTER_RULE} from '../constants/ActionTypes';

export default function domain(state = '', action) {
  switch (action.type) {
    case DO_FILTER_RULE:
      return action.domain;
    default:
      return state;
  }
}
