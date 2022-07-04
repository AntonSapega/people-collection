import { call } from 'redux-saga/effects';
import setPeopleCollection from '../../peopleDB/sagas/setPeopleCollection';
import setUserToState from '../../user/sagas/setUserToState';
import { sessionController } from '../../../services/storage/sessionController';

export default function* setMainData() {
  const user = yield sessionController.getUser();

  if (user) {
    yield call(setUserToState, user);
    yield call(setPeopleCollection);
  }
}