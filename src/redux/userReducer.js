import { CREATE_NEW_USER } from './types';

const user = {
  info: null,
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case CREATE_NEW_USER:
      sessionStorage.setItem('createdUser', JSON.stringify(action.payload));
      sessionStorage.setItem('token', JSON.stringify(action.payload.token));
      sessionStorage.setItem('userId', action.payload.id);
      return {...state, info: action.payload};
    default:
      return state;
  }
}