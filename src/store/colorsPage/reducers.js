import { createSlice } from "@reduxjs/toolkit";

const colorsPageSlice = createSlice({
  name: 'colors_page',
  initialState: {
    colors: [],
    pagesAmount: 0,
  },
  reducers: {
    addColorsOnPage(state, action) {
      state.colors = action.payload.data;
      state.pagesAmount = action.payload.total_pages;
    },
    loadColorsMiddleware() {
      // middleware
    },
    loadParticularColorsMiddleware() {
      // middleware
    }
  }
})

export const { addColorsOnPage, loadColorsMiddleware, loadParticularColorsMiddleware } = colorsPageSlice.actions;
export default colorsPageSlice.reducer;