import { SET_USER, REMOVE_USER } from './types';

const user = {
  info: null,
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, info: action.payload};
    case REMOVE_USER:
      return {...state, info: null};
    default:
      return state;
  }
}