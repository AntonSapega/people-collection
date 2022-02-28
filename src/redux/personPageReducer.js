import { GET_PERSON_DETAILS } from './types';

const initial = {
  mainInfo: null,
  favoriteColor: null,
};

export const personPageReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_PERSON_DETAILS:
      return {
        ...state,
        mainInfo: action.payload.mainInfo,
        favoriteColor: action.payload.favoriteColor
      };
    default:
      return state;
  }
}