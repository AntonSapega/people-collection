import axios from 'axios';
import { call, fork, take } from 'redux-saga/effects';
import { AUTH_USER } from '../types';
import setUserToState from './setUser';

function authUserRequest(cred) {
  return axios.post(`${process.env.REACT_APP_REQ_RES_URL}api/register`, cred);
}

function getPerson(identifier) {
  return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users/${identifier}`)
}

function* requestLoggedUser(credentials) {
  try {
    const authData = yield call(authUserRequest, credentials);
    console.log(authData);
    const user = yield call(getPerson, authData.data.id);
    user.data.data.token = authData.data.token;
    yield call(setUserToState, user.data.data);
  } catch (error) {
    if (error.response.status) {
      alert('User was not found');
    }
  }
}

export default function* Auth() {
  while(true) {
    const action = yield take(AUTH_USER);

    const credentials = {
      email: action.payload.email,
      password: action.payload.password
    }

    yield call(requestLoggedUser, credentials)
    console.log('AUTH_USER', credentials);
  }
}