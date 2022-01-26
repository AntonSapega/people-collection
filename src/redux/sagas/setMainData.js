import { call } from 'redux-saga/effects';
import setPeopleCollection from './setPeopleCollection';
import setUserToState from './setUser';

export default function* setMainDataSaga() {
  const user = yield JSON.parse(sessionStorage.getItem('user'));

  if (user) {
    yield call(setUserToState, user);
    yield call(setPeopleCollection);
  }
}