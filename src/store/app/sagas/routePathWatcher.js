import { takeEvery, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from "redux-first-history";
import { colorsPageWorker } from '../../colorsPage/sagas';
import { peoplePageWorker } from '../../peoplePage/sagas';
import { personPageDetailsWorker } from '../../personDetailsPage/sagas';

function* handlePath({ payload }) {
  // console.log('handlePath');
  const { location } = yield payload;
  const pathPieces = location.pathname.split('/').filter(string => string.length > 0);
  switch (pathPieces[pathPieces.length-2]) {
    case 'people':
      // yield call(peoplePageWorker, pathPieces[pathPieces.length-1]);
      break;
    case 'colors':
      yield call(colorsPageWorker, pathPieces[pathPieces.length-1]);
      break;
    case 'person':
      yield call(personPageDetailsWorker, pathPieces[pathPieces.length-1]);
      break;
    default:
      return;
  }
}


export default function* routePathWatcher() {
  // console.log('routePathWatcher');
  yield takeEvery(LOCATION_CHANGE, handlePath);
}