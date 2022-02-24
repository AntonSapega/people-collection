import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loader: {pendingRequests: 0},
  },
  reducers: {
    onLoader(state) {
      state.loader.pendingRequests = state.loader.pendingRequests + 1;
    },
    offLoader(state) {
      state.loader.pendingRequests = state.loader.pendingRequests - 1;
    }
  }
})

export const { onLoader, offLoader } = appSlice.actions;
export default appSlice.reducer;