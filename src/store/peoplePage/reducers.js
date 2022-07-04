import { createSlice } from "@reduxjs/toolkit";

const peoplePageSlice = createSlice({
  name: 'people_page',
  initialState: {
    people: [],
    pagesAmount: 0,
  },
  reducers: {
    loadPeoplePage(state, action) {
      state.people = action.payload.data;
      state.pagesAmount = action.payload.total_pages;
    },
    getPeopleMiddleware() {
      // middleware
    },
    getParticularPeople() {
      // middleware
    }
  }
})

export const { loadPeoplePage, getPeopleMiddleware, getParticularPeople } = peoplePageSlice.actions;
export default peoplePageSlice.reducer;