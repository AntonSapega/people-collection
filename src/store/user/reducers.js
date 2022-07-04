import { createSlice } from "@reduxjs/toolkit";
import { sessionController } from "../../services/storage/sessionController";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: null,
    userNotFound: false,
  },
  reducers: {
    createUser() {
      // middleware
    },
    authUser() {
      // middleware
    },
    setUser(state, {payload}) { //!!!!!! NOT PURE FUNCTION!
      if (!sessionController.getToken()) {
        sessionController.setToken(payload.token);
        sessionController.setUser(payload);
      }
      if (!state.info) {
        state.info = payload;
      }
    },
    removeUser(state) { //!!!!!! NOT PURE FUNCTION!
      sessionController.removeUser();
      sessionController.removeToken();

      state.info = null;
    },
    userWasNotFound(state) {
      state.userNotFound = true;
    },
    resetUserWasNotFoundField(state) {
      state.userNotFound = false;
    }
  }
})

export const { createUser, authUser, setUser, removeUser, userWasNotFound, resetUserWasNotFoundField } = userSlice.actions;
export default userSlice.reducer;