import { ADD_COLORS_SET, LOAD_COLORS, LOAD_PARTICULAR_COLORS } from '../types';

export const addColorsOnPage = (colors) => {
  return {
    type: ADD_COLORS_SET,
    payload: colors
  }
}

export const loadColorsMiddleware = (page) => { //! is not being used
  return {
    type: LOAD_COLORS,
    payload: page
  }
}

export const loadParticularColorsMiddleware = (ids) => {
  return {
    type: LOAD_PARTICULAR_COLORS,
    payload: ids
  }
}