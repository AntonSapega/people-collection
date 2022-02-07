import { call } from 'redux-saga/effects';
import setPeopleCollection from '../../peopleDB/sagas/setPeopleCollection';
import setUserToState from '../../user/sagas/setUserToState';

export default function* setMainData() {
  const user = yield JSON.parse(sessionStorage.getItem('user'));

  if (user) {
    yield call(setUserToState, user);
    yield call(setPeopleCollection);
  }
}