import { call, put, takeEvery } from 'redux-saga/effects';
import { deletePerson } from '../../../services/api/reqresApi';
import { DELETE_PERSON_MIDDLEWARE } from '../../types';
import { deletePerson as deletePersonAction } from '../actions';

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

export default function* removePerson() {
  yield takeEvery('people/deletePersonMiddleware', removePersonWorker)
}