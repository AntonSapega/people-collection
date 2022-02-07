import { all, call, spawn } from 'redux-saga/effects';
import createUser from './user/sagas/createUser';
import auth from './user/sagas/auth';
import setMainData from './app/sagas/setMainData';
import routePathWatcher from './app/sagas/routePathWatcher';
import removePerson from './peopleDB/sagas/removePerson';
import colorDetailsPage from './colorDetailsPage/sagas';

export default function* rootSaga() {
  const sagas = [
    setMainData,
    createUser,
    auth,
    routePathWatcher,
    removePerson,
    colorDetailsPage
  ];

  const retrySagas = yield sagas.map(saga => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.error('SAGA ERROR: ', e);
        }
      }
    })
  })

  yield all(retrySagas);
}