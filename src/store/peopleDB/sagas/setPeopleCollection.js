import { call, fork, put, select } from 'redux-saga/effects';
import { initPeopleCollection } from '../reducers';
import { getPeoplePage } from '../../../services/api/reqresApi';

function* getAllPeople(pageNumber = 1) {
  const isUserExistInState = yield select(state => state.user.info);
  if (isUserExistInState) {
    const req = yield call(getPeoplePage, pageNumber);
    yield put(initPeopleCollection(req.data.data));

    if (req.data.page < req.data.total_pages) {
      const nextPage = req.data.page + 1;
      yield call(getAllPeople, [nextPage]);
    }
  }
}

export default function* setPeopleCollection() {
  yield fork(getAllPeople);
}