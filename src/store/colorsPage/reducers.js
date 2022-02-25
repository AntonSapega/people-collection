import { createAction, createSlice } from "@reduxjs/toolkit";

const nameSlice = 'colors_page';

// Middleware
export const loadColors = createAction(`${nameSlice}/loadColors`);
export const loadParticularColors = createAction(`${nameSlice}/loadParticularColors`);

const colorsPageSlice = createSlice({
  name: nameSlice,
  initialState: {
    colors: [],
    pagesAmount: 0,
  },
  reducers: {
    addColorsOnPage(state, action) {
      state.colors = action.payload.data;
      state.pagesAmount = action.payload.total_pages;
    },
  }
})

export const { addColorsOnPage } = colorsPageSlice.actions;
export default colorsPageSlice.reducer;