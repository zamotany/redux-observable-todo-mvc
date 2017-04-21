import { SET_VISIBILITY_FILTER, SHOW_ALL } from './actions';

export default (state = SHOW_ALL, action) => {
  if (action.type === SET_VISIBILITY_FILTER) {
    return action.filter;
  }
  return state;
};
