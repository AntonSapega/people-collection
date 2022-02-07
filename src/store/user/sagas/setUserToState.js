import { put } from 'redux-saga/effects';
import { setUser } from '../actions';

export default function* setUserToState(userInfo) {
  yield put(setUser(userInfo));
};