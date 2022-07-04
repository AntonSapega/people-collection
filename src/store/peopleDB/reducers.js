import { createAction, createSlice } from "@reduxjs/toolkit";

const nameSlice = 'people';

// Middleware
export const deletePersonMiddleware = createAction(`${nameSlice}/deletePersonMiddleware`);

const peopleDBSlice = createSlice({
  name: nameSlice,
  initialState: {
    people: [],
  },
  reducers: {
    initPeopleCollection(state, action) {
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
  }
})

export const { initPeopleCollection, clearPeopleCollection, addNewPerson, deletePerson } = peopleDBSlice.actions;
export default peopleDBSlice.reducer;