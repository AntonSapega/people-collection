import { INIT_USERS, ADD_NEW_USER, DELETE_USER } from './types';

const usersDB = [];

export const usersReducer = (state = usersDB, action) => {
  switch (action.type) {
    case INIT_USERS:
      return usersDB.concat(action.payload)
    default:
      return state;
  }
}