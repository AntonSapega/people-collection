import { combineReducers } from "redux";
// import { appReducer } from './app/reducers';
// import { peopleDBReducer } from './peopleDB/reducers';
// import { userReducer } from './user/reducers';
import { peoplePageReducer } from './peoplePage/reducers';
import { colorsPageReducer } from './colorsPage/reducers';
import { personPageReducer } from './personDetailsPage/reducers';
import { colorDetailsReducer } from './colorDetailsPage/reducers';


import appReducer from './app/reducers';
import userReducer from './user/reducers';
import peopleDBReducer from './peopleDB/reducers';


const rootReducer = (router) => {
  return combineReducers({
    router,
    app: appReducer,
    peopleCollection: peopleDBReducer,
    user: userReducer,
    peoplePage: peoplePageReducer,
    // colorsPage: colorsPageReducer,
    // personDetails: personPageReducer,
    // colorDetailsPage: colorDetailsReducer
  })
}

export default rootReducer;





// import { combineReducers } from "redux";
// import appSlice from './app/reducers';
// import { peopleDBReducer } from './peopleDB/reducers';
// import { userReducer } from './user/reducers';
// import { peoplePageReducer } from './peoplePage/reducers';
// import { colorsPageReducer } from './colorsPage/reducers';
// import { personPageReducer } from './personDetailsPage/reducers';
// import { colorDetailsReducer } from './colorDetailsPage/reducers';
// import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = (router) => {
//   const reducers = combineReducers({
//     router,
    
//     // app: appSlice,
//     // peopleCollection: peopleDBReducer,
//     // user: userReducer,
//     // peoplePage: peoplePageReducer,
//     // colorsPage: colorsPageReducer,
//     // personDetails: personPageReducer,
//     // colorDetailsPage: colorDetailsReducer
//   })

//   return configureStore({
//     reducer: reducers
//   })
// }

// export default rootReducer;