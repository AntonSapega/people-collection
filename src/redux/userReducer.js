import { SET_USER, REMOVE_USER, USER_WAS_NOT_FOUND, RESET_USER_WAS_NOT_FOUND_FIELD } from './types';

const user = {
  info: null,
  userNotFound: false,
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case SET_USER:
      if (!state.info) {
        return {...state, info: action.payload};
      }
      return state;
    case REMOVE_USER:
      return {...state, info: null};
    case USER_WAS_NOT_FOUND:
      return {...state, userNotFound: true};
    case RESET_USER_WAS_NOT_FOUND_FIELD:
      return {...state, userNotFound: false};
    default:
      return state;
  }
}