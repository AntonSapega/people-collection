import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { peopleReducer } from "./peopleReducer";
import { userReducer } from "./userReducer";
import { peoplePageReducer } from './peoplePageReducer';
import { colorsPageReducer } from './colorsPageReducer';

// export const rootReducer = combineReducers({
//   app: appReducer,
//   peopleCollection: peopleReducer,
//   user: userReducer,
//   peoplePage: peoplePageReducer,
// })

export const rootReducer = (router) => {
  return combineReducers({
    router,
    app: appReducer,
    peopleCollection: peopleReducer,
    user: userReducer,
    peoplePage: peoplePageReducer,
    colorsPage: colorsPageReducer,
  })
}