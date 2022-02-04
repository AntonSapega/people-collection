import { call, fork, put, select } from 'redux-saga/effects';
import { initPeopleCollection } from '../actions';
import { getPeoplePage } from '../../httpAPIs/reqresApi';

function* getPeopleCollection(pageNumber = 1) {
  const isUserExistInState = yield select(state => state.user.info);
  if (isUserExistInState) {
    const req = yield call(getPeoplePage, pageNumber);
    yield put(initPeopleCollection(req.data.data));

    if (req.data.page < req.data.total_pages) {
      const nextPage = req.data.page + 1;
      yield call(getPeopleCollection, [nextPage]);
    }
  }
}

export default function* setPeopleCollection() {
  yield fork(getPeopleCollection);
}