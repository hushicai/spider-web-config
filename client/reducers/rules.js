import {
  GET_RULE_LIST_DONE,
  ADD_RULE,
  DELETE_RULE
} from '../actions';

function rules(
  state = {list: [], loaded: false},
  action
) {
  switch (action.type) {
    case GET_RULE_LIST_DONE:
      return Object.assign({}, state, {
        list: action.data.list,
        // pager
        loaded: true
      });
    case ADD_RULE:
      return state.list.push(action.rule);
    case DELETE_RULE:
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
