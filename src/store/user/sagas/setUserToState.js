import { put } from 'redux-saga/effects';
import { setUser } from '../reducers';

export default function* setUserToState(userInfo) {
  yield put(setUser(userInfo));
};