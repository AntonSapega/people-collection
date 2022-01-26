import { call, fork, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { initPeopleCollection } from '../actions';

function usersRequest(page) {
  return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users?page=${page}`);
}

function* getPeopleCollection(pageNumber = 1) {
  const isUserExistInState = yield select(state => state.user.info);
  if (isUserExistInState) {
    const req = yield call(usersRequest, pageNumber);
    yield put(initPeopleCollection(req.data.data));

    if (req.data.page < req.data.total_pages) {
      const nextPage = req.data.page + 1;
      yield call(getPeopleCollection, nextPage);
    }
  }
}

export default function* setPeopleCollection() {
  yield fork(getPeopleCollection);
}