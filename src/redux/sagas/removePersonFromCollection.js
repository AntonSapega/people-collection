import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { deletePerson as deletePersonAction } from '../actions';
import { DELETE_PERSON_MIDDLEWARE } from '../types';
import { deletePerson } from '../../httpAPIs/reqresApi';

function* removePersonWorker({ payload: id }) {
  try {
    const serverResponse = yield call(deletePerson, id);
    if (serverResponse.status === 204) {
      yield put(deletePersonAction(id))
    }
  }
  catch(error) {
    throw new Error(error);
  }
}

export default function* removePersonFromCollection() {
  yield takeEvery(DELETE_PERSON_MIDDLEWARE, removePersonWorker)
}