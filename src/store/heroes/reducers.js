import { createAction, createSlice } from "@reduxjs/toolkit";

const nameSlice = 'heroes';

// Middleware
export const loadHeroes = createAction(`${nameSlice}/loadHeroes`);

const heroesSlice = createSlice({
  name: nameSlice,
  initialState: {
    heroes: null
  },
  reducers: {
    addHeroes(state, action) {
      state.heroes = action.payload;
    }
  }
})

export const { addHeroes } = heroesSlice.actions;
export default heroesSlice.reducer;