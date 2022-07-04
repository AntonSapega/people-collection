import { combineReducers } from "redux";
import { appReducer } from './app/reducers';
import { peopleDBReducer } from './peopleDB/reducers';
import { userReducer } from './user/reducers';
import { peoplePageReducer } from './peoplePage/reducers';
import { colorsPageReducer } from './colorsPage/reducers';
import { personPageReducer } from './personDetailsPage/reducers';
import { colorDetailsReducer } from './colorDetailsPage/reducers';

const rootReducer = (router) => {
  return combineReducers({
    router,
    app: appReducer,
    peopleCollection: peopleDBReducer,
    user: userReducer,
    peoplePage: peoplePageReducer,
    colorsPage: colorsPageReducer,
    personDetails: personPageReducer,
    colorDetailsPage: colorDetailsReducer
  })
}

export default rootReducer;