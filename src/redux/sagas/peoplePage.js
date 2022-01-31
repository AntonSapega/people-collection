import { actionChannel, all, call, delay, put, select, take, takeEvery } from "redux-saga/effects";
import { LOAD_PEOPLE_SET } from '../types';
import { getColorsPage, getPeoplePage } from '../../httpAPIs/reqresApi';
import { loadPeoplePage, addColorsOnPage } from '../actions';
import { LOCATION_CHANGE } from "redux-first-history";
import { INIT_LIST_OF_PEOPLE } from '../types';


function* PeoplePageRequest(pageNumber) {
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

function* ColorsPageRequest(pageNumber) {
  const { data } = yield call(getColorsPage, pageNumber);
  yield put(addColorsOnPage(data));
}

function* handlePath({ payload }) {
  const { location } = yield payload;
  const pathPieces = location.pathname.split('/').filter(string => string.length > 0);
  console.log(pathPieces[pathPieces.length-2])
  switch (pathPieces[pathPieces.length-2]) {
    case 'people':
      yield call(PeoplePageRequest, pathPieces[pathPieces.length-1]);
      break;
    case 'colors':
      yield call(ColorsPageRequest, pathPieces[pathPieces.length-1])
    default:
      return;
  }
}


export default function* peoplePage() {
  yield takeEvery(LOCATION_CHANGE, handlePath);

  // while(true) {
  //   const action = yield all([
  //     take(LOCATION_CHANGE),
  //     take(INIT_LIST_OF_PEOPLE)
  //   ])

  //   console.log('action', action)
  // }
}