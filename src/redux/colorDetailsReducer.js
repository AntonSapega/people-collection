import { SET_COLOR_DETAILS } from './types';

const initial = {
  color: null,
  creator: null,
  description: null
};

export const colorDetailsReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_COLOR_DETAILS:
      return {
        ...state,
        color: action.payload.color,
        creator: action.payload.creator,
        description: action.payload.description
      };
    default:
      return state;
  }
}