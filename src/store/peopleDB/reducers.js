// import { INIT_LIST_OF_PEOPLE, ADD_NEW_PERSON, DELETE_PERSON, CLEAR_LIST_OF_PEOPLE } from '../types';

// const peopleCollection = {
//   people: [],
// };

// export const peopleDBReducer = (state = peopleCollection, action) => {
//   switch (action.type) {
//     case INIT_LIST_OF_PEOPLE:
//       return {...state, people: state.people.concat(action.payload)};
//     case CLEAR_LIST_OF_PEOPLE:
//       return {...state, people: []};
//     case ADD_NEW_PERSON:
      // const isAlreadyAdded = state.people.find(person => person.id === action.payload.id);
      // if (!isAlreadyAdded) {
      //   return {...state, people: state.people.concat([action.payload])};
      // }
      // return state;
//     case DELETE_PERSON:
//       return {...state, people: state.people.filter(person => person.id !== action.payload)}
//     default:
//       return state;
//   }
// }


import { createSlice } from "@reduxjs/toolkit";

const peopleDBSlice = createSlice({
  name: 'people',
  initialState: {
    people: [],
  },
  reducers: {
    initPeopleCollection(state, action) {
      console.log('initPeopleCollection', action)
      state.people = state.people.concat(action.payload);
    },
    clearPeopleCollection(state) {
      state.people = [];
    },
    addNewPerson(state, action) {
      const isAlreadyAdded = state.people.find(person => person.id === action.payload.id);
      if (!isAlreadyAdded) {
        state.people.concat([action.payload]);
      }
    },
    deletePerson(state, action) {
      state.people = state.people.filter(person => person.id !== action.payload);
    },
    deletePersonMiddleware() {
      // middleware
    }
  }
})

export const { initPeopleCollection, clearPeopleCollection, addNewPerson, deletePerson, deletePersonMiddleware } = peopleDBSlice.actions;
export default peopleDBSlice.reducer;