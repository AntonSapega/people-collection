import { LOAD_COLOR_DETAILS_MIDDLEWARE, SET_COLOR_DETAILS } from '../types';

export const loadColorDetailsMiddleware = (id) => {
  return {
    type: LOAD_COLOR_DETAILS_MIDDLEWARE,
    payload: id
  }
}

export const setColorDetails = (fullInfo) => {
  return {
    type: SET_COLOR_DETAILS,
    payload: fullInfo
  }
}