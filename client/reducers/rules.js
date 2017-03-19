import {
  GET_RULE_LIST_DONE,
  GET_RULE_DONE,
  ADD_RULE_DONE,
  EDIT_RULE_DONE,
  DELETE_RULE_DONE
} from '../actions';

function rules(
  state = {list: []},
  action
) {
  switch (action.type) {
    case GET_RULE_LIST_DONE:
      return Object.assign({}, state, {
        list: action.data.list
      });
    case GET_RULE_DONE:
    case ADD_RULE_DONE:
      state.list.push(action.rule);
      return state;
    case EDIT_RULE_DONE:
      return Object.assign({}, state, {
        list: state.list.map((rule) => {
          if (rule.id === action.id) {
            return action.rule;
          }
          return rule;
        })
      });
    case DELETE_RULE_DONE:
      return Object.assign({}, state, {
        list: state.list.filter((rule) => {
          return rule.id !== action.id
        })
      });
    default:
      return state;
  }
}

export default rules;
