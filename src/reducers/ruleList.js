import {
  ADD_RULE_SUCCESS,
  EDIT_RULE_SUCCESS,
  DELETE_RULE
} from '../constants/ActionTypes';

function ruleList(state = [], action) {
  switch (action.type) {
    case ADD_RULE_SUCCESS:
      return [
        ...state,
        action.rule
      ];
    case EDIT_RULE_SUCCESS:
      return state.map((rule) => {
        return rule.id === action.id ? action.rule : rule;
      });
    case DELETE_RULE:
      return state.filter((rule) => {
        return rule.id !== action.id;
      });
    default:
      return state;
  }
}

export default ruleList;
