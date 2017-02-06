import {SHOW_LOADING, HIDE_LOADING} from '../constants/ActionTypes';

function loading(state = 0, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return 1;
      break;
    case HIDE_LOADING:
      return 0;
      break;
    default:
      return state;
  }
}

export default loading;
