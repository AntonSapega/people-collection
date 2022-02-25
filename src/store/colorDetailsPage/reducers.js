import { createAction, createSlice } from "@reduxjs/toolkit";

export const loadColorDetailsMiddleware = createAction('color_details/loadColorDetailsMiddleware');

const colorDetailsSlice = createSlice({
  name: 'color_details',
  initialState: {
    color: null,
    creator: null,
    description: null
  },
  reducers: {
    // loadColorDetailsMiddleware() {
    //   // middleware
    // },
    setColorDetails(state, action) {
      state.color = action.payload.color;
      state.creator = action.payload.creator;
      state.description = action.payload.description;
    }
  }
})

export const { setColorDetails } = colorDetailsSlice.actions;
export default colorDetailsSlice.reducer;