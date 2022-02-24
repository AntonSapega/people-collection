import { call, take } from "redux-saga/effects";
import setUserToState from "./setUserToState";
import setPeopleCollection from "../../peopleDB/sagas/setPeopleCollection";
import { createNewUser } from '../../../services/api/reqresApi';

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
    const newUser = yield take('user/createUser');
    const credentials = {
      email: newUser.payload.email,
      job: 'unknown'
    }
    const createUserRequest = yield call(createNewUser, credentials);
    newUser.payload.id = createUserRequest.data.id;
    const user = yield call(createMockUser, newUser.payload);
    yield call(setUserToState, user);
    yield call(setPeopleCollection);
  }
}