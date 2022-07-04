import { combineReducers } from "redux";
import appSlice from './app/reducers';
import userSlice from './user/reducers';
import peopleDBSlice from './peopleDB/reducers';
import peoplePageSlice from './peoplePage/reducers';
import personPageSlice from './personDetailsPage/reducers';
import colorsPageSlice from './colorsPage/reducers';
import colorDetailsSlice from './colorDetailsPage/reducers';
import heroesSlice from './heroes/reducers';

const rootReducer = (router) => {
  return combineReducers({
    router,
    app: appSlice,
    peopleCollection: peopleDBSlice,
    user: userSlice,
    peoplePage: peoplePageSlice,
    personDetails: personPageSlice,
    colorsPage: colorsPageSlice,
    colorDetailsPage: colorDetailsSlice,
    heroes: heroesSlice
  })
}

export default rootReducer;