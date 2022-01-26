import { call, put, take } from "redux-saga/effects";
import { CREATE_USER } from '../types';
import { setUser } from "../actions";
import setPeopleCollection from "./setPeopleCollection";
import { createNewUser } from '../../httpAPIs/reqresApi';

function* createMockUser(user) {
  return yield new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: user.id,
        token: Date.now(),
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName
      })
    }, 1000)
  })
}

export default function* createUser() {
  while (true) {
    const newUser = yield take(CREATE_USER);
    const credentials = {
      email: newUser.payload.email,
      job: 'unknown'
    }
    const createUserRequest = yield call(createNewUser, credentials);
    newUser.payload.id = createUserRequest.data.id;
    const user = yield call(createMockUser, newUser.payload);
    yield put(setUser(user));
    yield call(setPeopleCollection)
  }
}