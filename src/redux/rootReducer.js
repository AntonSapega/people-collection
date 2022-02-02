import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { peopleReducer } from "./peopleReducer";
import { userReducer } from "./userReducer";
import { peoplePageReducer } from './peoplePageReducer';
import { colorsPageReducer } from './colorsPageReducer';
import { personPageReducer } from './personPageReducer';
import { colorDetailsReducer } from './colorDetailsReducer';

export const rootReducer = (router) => {
  return combineReducers({
    router,
    app: appReducer,
    peopleCollection: peopleReducer,
    user: userReducer,
    peoplePage: peoplePageReducer,
    colorsPage: colorsPageReducer,
    personDetails: personPageReducer,
    colorDetailsPage: colorDetailsReducer
  })
}