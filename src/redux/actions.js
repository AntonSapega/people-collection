import axios from 'axios';
import { ADD_LOADER_REQUEST, DECREASE_LOADER_REQUEST, INIT_LIST_OF_PEOPLE, SET_USER, DELETE_PERSON, ADD_NEW_PERSON, REMOVE_USER } from './types';

export const onLoader = () => {
  return {
    type: ADD_LOADER_REQUEST,
  }
}

export const offLoader = () => {
  return {
    type: DECREASE_LOADER_REQUEST,
  }
}

export const initPeopleCollection = () => {
  return async dispatch => {
    await fetchPeople(dispatch, 1);
  }
}

export const createUser = (payload) => {
  return async dispatch => {
    await createMockUser(payload, dispatch);
  }
}

export const getLoggedUser = (paramsForLogin) => {
    return async dispatch => {
      const user = await userRequest(paramsForLogin);
      console.log(user);
      dispatch(setUser(user));
      dispatch(addNewPerson(user));
  }
}

export const setUser = (user) => {
  if (!sessionStorage.getItem('token')) {
    sessionStorage.setItem('token', JSON.stringify(user.token));
    delete user.token;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  return {
    type: SET_USER,
    payload: user
  }
}

export const removeUser = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
  return {
    type: REMOVE_USER
  }
}

export const addNewPerson = (payload) => {
  return {
    type: ADD_NEW_PERSON,
    payload
  }
}

export const deletePerson = (personId) => {
  return {
    type: DELETE_PERSON,
    payload: personId
  }
}



// Auxiliary functions:
function fetchPeople(dispatchFn, pageNumber) {
  usersRequest(pageNumber).then(response => {
    dispatchFn({
      type: INIT_LIST_OF_PEOPLE,
      payload: response.data.data
    })

    if (response.data.page < response.data.total_pages) {
      fetchPeople(dispatchFn, pageNumber + 1);
    }

    // if (response.data.page === response.data.total_pages && JSON.parse(sessionStorage.getItem('createdUser'))) {
    //   const user = JSON.parse(sessionStorage.getItem('createUser'));
    //   dispatchFn(addNewUser(user))
    // }
  })
}

function usersRequest(pageNumber) {
  return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users?page=${pageNumber}`)
}

async function createMockUser(userData, dispatchFn) {
  const newUser = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        token: Date.now(),
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName
      })
    }, 1000)
  })

   await newUser.then(user => {
    dispatchFn(setUser(user));
    // dispatchFn(addNewPerson(user));
  })
}

async function userRequest(credentials) {
  let userInfo = null;
  const baseUserInfo = await axios.post(`${process.env.REACT_APP_REQ_RES_URL}api/register`, credentials);
  await axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users/${baseUserInfo.data.id}`)
    .then(result => {
      userInfo = {...result.data.data, token: baseUserInfo.data.token};
    })
    .catch((error) => {
      if (error.response?.status === 400) {
        alert('User was not found');
      }
    })
  return userInfo;
}