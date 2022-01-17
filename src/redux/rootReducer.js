import { combineReducers } from "redux";
import { peopleReducer } from "./peopleReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  peopleCollection: peopleReducer,
  user: userReducer,
})