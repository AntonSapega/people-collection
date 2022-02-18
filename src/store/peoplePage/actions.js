import { ADD_PEOPLE_ON_PAGE, LOAD_PEOPLE_SET, LOAD_PARTICULAR_PEOPLE } from '../types';

export const loadPeoplePage = (people) => {
  return {
    type: ADD_PEOPLE_ON_PAGE,
    payload: people
  }
}

export const getPeopleMiddleware = (page) => {
  return {
    type: LOAD_PEOPLE_SET,
    payload: page
  }
}

export const getParticularPeople = (ids) => {
  return {
    type: LOAD_PARTICULAR_PEOPLE,
    payload: ids
  }
}