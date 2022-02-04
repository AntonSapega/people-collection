import { combineReducers } from "redux";

const reducer = (router) => {
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

export default reducer;