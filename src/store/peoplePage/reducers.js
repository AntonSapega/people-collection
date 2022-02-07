import { ADD_PEOPLE_ON_PAGE } from '../types';

const initial = {
  people: [],
  pagesAmount: 0,
};

export const peoplePageReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_PEOPLE_ON_PAGE:
      return {...state, people: action.payload.data, pagesAmount: action.payload.total_pages};
    default:
      return state;
  }
}