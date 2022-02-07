import { ADD_COLORS_SET } from '../types';

export const addColorsOnPage = (colors) => {
  return {
    type: ADD_COLORS_SET,
    payload: colors
  }
}