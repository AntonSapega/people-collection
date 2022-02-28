import { INIT_LIST_OF_PEOPLE, ADD_NEW_PERSON, DELETE_PERSON } from './types';

const peopleCollection = {
  people: [],
};

export const peopleReducer = (state = peopleCollection, action) => {
  switch (action.type) {
    case INIT_LIST_OF_PEOPLE:
      return {...state, people: state.people.concat(action.payload)}; // REWRiTE
    case ADD_NEW_PERSON:
      const isAlreadyAdded = state.people.find(person => person.id === action.payload.id);
      // console.log('Already exist: ', isAlreadyAdded)
      if (!isAlreadyAdded) {
        return {...state, people: state.people.concat([action.payload])};
      }
      return state;
    case DELETE_PERSON:
      return {...state, people: state.people.filter(person => person.id !== action.payload)}
    default:
      return state;
  }
}