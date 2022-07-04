// import { GET_PERSON_DETAILS } from '../types';

// const initial = {
//   mainInfo: null,
//   favoriteColor: null,
// };

// export const personPageReducer = (state = initial, action) => {
//   switch (action.type) {
//     case GET_PERSON_DETAILS:
//       return {
//         ...state,
//         mainInfo: action.payload.mainInfo,
//         favoriteColor: action.payload.favoriteColor
//       };
//     default:
//       return state;
//   }
// }

import { createSlice } from "@reduxjs/toolkit";

const personPageSlice = createSlice({
  name: 'person_page',
  initialState: {
    mainInfo: null,
    favoriteColor: null,
  },
  reducers: {
    getPersonDetails(state, action) {
      state.mainInfo = action.payload.mainInfo;
      state.favoriteColor = action.payload.favoriteColor;
    }
  }
})

export const { getPersonDetails } = personPageSlice.actions;
export default personPageSlice.reducer;



// import { GET_PERSON_DETAILS } from '../types';

// export const getPersonDetails = (details) => {
//   return {
//     type: GET_PERSON_DETAILS,
//     payload: details
//   }
// }