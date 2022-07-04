import { all, call, fork, join, put, select, takeEvery } from 'redux-saga/effects';
import { getPeoplePage, getPerson } from '../../services/api/reqresApi';
import { loadPeoplePage } from './actions';
import { sessionController } from '../../services/storage/sessionController';
import { LOAD_PEOPLE_SET, LOAD_PARTICULAR_PEOPLE } from '../types';

// export function* peoplePageWorker(pageNumber) {
//   console.log('peoplePageWorker', pageNumber)
//   const { data } = yield call(getPeoplePage, pageNumber);
//   if (Number(data.total_pages) === Number(pageNumber)) {
//     const user = sessionController.getUser();
//     const peopleCollectionCopy = yield select(state => state.peopleCollection.people);
//     const isAlreadyExist = peopleCollectionCopy.find(human => human.id === user.id);

//     if (!isAlreadyExist) {
//       data.data.push(user);
//     }
//   }
//   yield put(loadPeoplePage(data));
// }

export function* peoplePageWorker(pageNumber) {
  const { data } = yield call(getPeoplePage, pageNumber.payload);
  if (Number(data.total_pages) === Number(pageNumber)) {
    const user = sessionController.getUser();
    const peopleCollectionCopy = yield select(state => state.peopleCollection.people);
    const isAlreadyExist = peopleCollectionCopy.find(human => human.id === user.id);

    if (!isAlreadyExist) {
      data.data.push(user);
    }
  }
  yield put(loadPeoplePage(data));
}

function* loadRequestedPeople( {payload: peopleIds} ) {
  const requests = peopleIds.map(id => call(getPerson, id));
  const response = yield all(requests);
  const preparedData = response.map(response => response.data.data);
  yield put(loadPeoplePage({data: preparedData}));
}

export function* peoplePageWatcher() {
  yield takeEvery(LOAD_PEOPLE_SET, peoplePageWorker);
}

export function* getPeopleSetWatcher() {
  yield takeEvery(LOAD_PARTICULAR_PEOPLE, loadRequestedPeople);
}