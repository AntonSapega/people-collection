import {
  ADD_LOADER_REQUEST,
  DECREASE_LOADER_REQUEST,
  INIT_LIST_OF_PEOPLE,
  SET_USER,
  DELETE_PERSON,
  CREATE_USER,
  AUTH_USER,
  ADD_NEW_PERSON,
  REMOVE_USER,
  ADD_PEOPLE_ON_PAGE,
  ADD_COLORS_SET
} from './types';

export const onLoader = () => {
  return {
    type: ADD_LOADER_REQUEST,
  }
}

export const offLoader = () => {
  return {
    type: DECREASE_LOADER_REQUEST,
  }
}

export const initPeopleCollection = (payload) => {
  return {
    type: INIT_LIST_OF_PEOPLE,
    payload
  }
}

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

export const addNewPerson = (payload) => {
  return {
    type: ADD_NEW_PERSON,
    payload
  }
}

export const deletePerson = (personId) => {
  return {
    type: DELETE_PERSON,
    payload: personId
  }
}

export const loadPeoplePage = (people) => {
  return {
    type: ADD_PEOPLE_ON_PAGE,
    payload: people
  }
}

export const addColorsOnPage = (colors) => {
  return {
    type: ADD_COLORS_SET,
    payload: colors
  }
}