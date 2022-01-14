import { INIT_USERS, ADD_NEW_USER, DELETE_USER } from './types';

export const initUsers = () => {
  return {
    type: INIT_USERS
  }
}

export const addNewUser = () => {
  return {
    type: ADD_NEW_USER
  }
}

export const deleteUser = () => {
  return {
    type: DELETE_USER
  }
}