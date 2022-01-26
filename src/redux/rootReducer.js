import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { peopleReducer } from "./peopleReducer";
import { userReducer } from "./userReducer";
import { peoplePageReducer } from './peoplePageReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  peopleCollection: peopleReducer,
  user: userReducer,
  peoplePage: peoplePageReducer,
})