import { all, call, spawn } from 'redux-saga/effects';
import setMainDataSaga from './setMainData';
import createUser from './createUser';
import Auth from './auth';
import peoplePage from './peoplePage';

export default function* rootSaga() {
  const sagas = [setMainDataSaga, createUser, Auth, peoplePage];

  const retrySagas = yield sagas.map(saga => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log('SAGA ERROR: ', e);
        }
      }
    })
  })

  yield all(retrySagas);
}