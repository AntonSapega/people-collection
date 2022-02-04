import { actionChannel, all, call, delay, put, select, take, takeEvery } from "redux-saga/effects";
import { LOAD_PEOPLE_SET } from '../types';
import {
  getColorsPage,
  getPeoplePage,
  getPerson,
  getColor
} from '../../httpAPIs/reqresApi';
import { loadPeoplePage, addColorsOnPage, getPersonDetails } from '../actions';
import { LOCATION_CHANGE } from "redux-first-history";
import { INIT_LIST_OF_PEOPLE } from '../types';


function* peoplePageRequest(pageNumber) {
  const { data } = yield call(getPeoplePage, pageNumber);
  if (Number(data.total_pages) === Number(pageNumber)) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const peopleCollectionCopy = yield select(state => state.peopleCollection.people);
    const isAlreadyExist = peopleCollectionCopy.find(human => human.id === user.id);

    if (!isAlreadyExist) {
      data.data.push(user);
    }
  }
  yield put(loadPeoplePage(data));
}

function* colorsPageRequest(pageNumber) {
  const { data } = yield call(getColorsPage, pageNumber);
  yield put(addColorsOnPage(data));
}

function* personPageDetailsRequest(id) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  try {
    const person = yield call(getPerson, id);
    const colorDetails = yield call(getColor, id);

    const personFullInfo = {
      mainInfo: person.data.data,
      favoriteColor: colorDetails.data.data
    };

    yield put(getPersonDetails(personFullInfo));
  }
  catch(error) {
    if (error.response.status === 404 && user.id === id) {
      yield put(getPersonDetails({mainInfo: user, favoriteColor: {}}))
    }
  }
}

function* handlePath({ payload }) {
  console.log('handlePath');
  const { location } = yield payload;
  const pathPieces = location.pathname.split('/').filter(string => string.length > 0);
  switch (pathPieces[pathPieces.length-2]) {
    case 'people':
      yield call(peoplePageRequest, pathPieces[pathPieces.length-1]);
      break;
    case 'colors':
      yield call(colorsPageRequest, pathPieces[pathPieces.length-1]);
      break;
    case 'person':
      yield call(personPageDetailsRequest, pathPieces[pathPieces.length-1]);
      break;
    default:
      return;
  }
}


export default function* routePathMiddleware() {
  console.log('routePathMiddleware');
  yield takeEvery(LOCATION_CHANGE, handlePath);

  // while(true) {
  //   const action = yield all([
  //     take(LOCATION_CHANGE),
  //     // take('@@INIT')
  //   ])

  //   console.log('action', action)
  // }
}