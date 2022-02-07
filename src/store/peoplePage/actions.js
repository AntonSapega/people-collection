import { ADD_PEOPLE_ON_PAGE } from '../types';

export const loadPeoplePage = (people) => {
  return {
    type: ADD_PEOPLE_ON_PAGE,
    payload: people
  }
}