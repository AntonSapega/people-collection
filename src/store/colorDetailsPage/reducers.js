import { createAction, createSlice } from "@reduxjs/toolkit";

const sliceName = 'color_details';

// Middleware
export const loadColorDetails = createAction(`${sliceName}/loadColorDetails`);

const colorDetailsSlice = createSlice({
  name: sliceName,
  initialState: {
    color: null,
    creator: null,
    description: null
  },
  reducers: {
    setColorDetails(state, action) {
      state.color = action.payload.color;
      state.creator = action.payload.creator;
      state.description = action.payload.description;
    }
  }
})

export const { setColorDetails } = colorDetailsSlice.actions;
export default colorDetailsSlice.reducer;