import ActionTypes from '../constants/ActionTypes';

function ruleList(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_RULE:
      return [
        ...state,
        action.rule
      ];
    case ActionTypes.EDIT_RULE:
      return state.map((rule) => {
        return rule.id === action.id ? action.rule : rule;
      });
    case ActionTypes.DELETE_RULE:
      return state.filter((rule) => {
        return rule.id !== action.id;
      });
    default:
      return state;
  }
}

export default ruleList;
