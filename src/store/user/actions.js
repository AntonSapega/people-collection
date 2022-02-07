import {
  AUTH_USER,
  CREATE_USER,
  SET_USER,
  REMOVE_USER,
  USER_WAS_NOT_FOUND,
  RESET_USER_WAS_NOT_FOUND_FIELD
} from '../types';

export const authUser = (userCredentials) => {
  return {
    type: AUTH_USER,
    payload: userCredentials
  }
}

export const createUser = (userCredentials) => {
  return {
    type: CREATE_USER,
    payload: userCredentials
  }
}

export const setUser = (user) => {
  if (!sessionStorage.getItem('token')) {
    sessionStorage.setItem('token', JSON.stringify(user.token));
    delete user.token;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  return {
    type: SET_USER,
    payload: user
  }
}

export const removeUser = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
  return {
    type: REMOVE_USER
  }
}

export const userWasNotFound = () => {
  return {
    type: USER_WAS_NOT_FOUND
  }
}

export const resetUserWasNotFoundField = () => {
  return {
    type: RESET_USER_WAS_NOT_FOUND_FIELD
  }
}