import { ADD_COLORS_SET} from '../types';

const initial = {
  colors: [],
  pagesAmount: 0,
};

export const colorsPageReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_COLORS_SET:
      return {...state, colors: action.payload.data, pagesAmount: action.payload.total_pages};
    default:
      return state;
  }
}