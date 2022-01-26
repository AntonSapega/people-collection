import { ADD_PEOPLE_ON_PAGE } from './types';

const initial = {
  people: [],
};

export const peoplePageReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_PEOPLE_ON_PAGE:
      return {...state, people: action.payload};
    default:
      return state;
  }
}