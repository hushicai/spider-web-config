import {DO_FILTER_RULE} from '../actions';

export default function domain(state = '', action) {
  switch (action.type) {
    case DO_FILTER_RULE:
      return action.domain;
    default:
      return state;
  }
}
