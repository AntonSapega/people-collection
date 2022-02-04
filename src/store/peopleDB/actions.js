import { INIT_LIST_OF_PEOPLE, CLEAR_LIST_OF_PEOPLE, ADD_NEW_PERSON, DELETE_PERSON } from '../types';

export const initPeopleCollection = (payload) => {
  return {
    type: INIT_LIST_OF_PEOPLE,
    payload
  }
}

export const clearPeopleCollection = () => {
  return {
    type: CLEAR_LIST_OF_PEOPLE,
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