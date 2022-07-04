import { call, take, put } from 'redux-saga/effects';
import { authUser, getPerson } from '../../../services/api/reqresApi';
import setUserToState from './setUserToState';
import setPeopleCollection from '../../peopleDB/sagas/setPeopleCollection';
import { userWasNotFound } from '../reducers';

function* requestLoggedUser(credentials) {
  try {
    const authData = yield call(authUser, credentials);
    const user = yield call(getPerson, authData.data.id);
    user.data.data.token = authData.data.token;
    yield call(setUserToState, user.data.data);
    yield call(setPeopleCollection)
  } catch (error) {
    if (error.response.status) {
      yield put(userWasNotFound());
      return;
    }
    throw new Error(error);
  }
}

export default function* auth() {
  while(true) {
    const action = yield take('user/authUser');

    const credentials = {
      email: action.payload.email,
      password: action.payload.password
    }

    yield call(requestLoggedUser, credentials);
  }
}