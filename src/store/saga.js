import { all, call, spawn } from 'redux-saga/effects';
import createUser from './user/sagas/createUser';
import auth from './user/sagas/auth';
import setMainData from './app/sagas/setMainData';
import routePathWatcher from './app/sagas/routePathWatcher';
import removePerson from './peopleDB/sagas/removePerson';
import colorDetailsPage from './colorDetailsPage/sagas';
import { peoplePageWatcher, getPeopleSetWatcher } from './peoplePage/sagas';
import { loadParticularColorsWatcher, colorsPageWatcher } from './colorsPage/sagas';
import loadHeroes from './heroes/sagas';

export default function* rootSaga() {
  const sagas = [
    setMainData,
    createUser,
    auth,
    routePathWatcher,
    removePerson,
    colorDetailsPage,
    peoplePageWatcher,
    getPeopleSetWatcher,
    colorsPageWatcher,
    loadParticularColorsWatcher,
    loadHeroes,
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