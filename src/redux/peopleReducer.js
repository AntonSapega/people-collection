import { INIT_LIST_OF_PEOPLE, ADD_NEW_USER, DELETE_PERSON } from './types';

const peopleCollection = {
  people: [],
};

export const peopleReducer = (state = peopleCollection, action) => {
  switch (action.type) {
    case INIT_LIST_OF_PEOPLE:
      return {...state, people: state.people.concat(action.payload)}; // REWRiTE
    case ADD_NEW_USER:
      return {...state, people: state.people.concat([action.payload])};
    case DELETE_PERSON:
      return {...state, people: state.people.filter(person => person.id !== action.payload.id)}
    default:
      return state;
  }
}