import { ADD_LOADER_REQUEST, DECREASE_LOADER_REQUEST } from '../types';

const appState = {
  loader: {pendingRequests: 0},
};

export const appReducer = (state = appState, action) => {
  switch (action.type) {
    case ADD_LOADER_REQUEST:
      return {...state, loader: {pendingRequests: state.loader.pendingRequests + 1}};
    case DECREASE_LOADER_REQUEST:
      return {...state, loader: {pendingRequests: state.loader.pendingRequests - 1}};
    default:
      return state;
  }
}