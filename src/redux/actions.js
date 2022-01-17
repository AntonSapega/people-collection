import axios from 'axios';
import { INIT_LIST_OF_PEOPLE, CREATE_NEW_USER, ADD_NEW_USER, DELETE_PERSON } from './types';

export const initPeopleCollection = () => {
  return async dispatch => {
    await fetchUsers(dispatch, 1);
  }
}

export const createUser = (payload) => {
  return async dispatch => {
    await createMockUser(payload, dispatch);
  }
}

export const addNewUser = (payload) => {
  return {
    type: ADD_NEW_USER,
    payload
  }
}

export const deletePerson = (payload) => {
  return {
    type: DELETE_PERSON,
    payload
  }
}



// Auxiliary functions:
function fetchUsers(dispatchFn, pageNumber) {
  usersRequest(pageNumber).then(response => {
    dispatchFn({
      type: INIT_LIST_OF_PEOPLE,
      payload: response.data.data
    })

    if (response.data.page < response.data.total_pages) {
      fetchUsers(dispatchFn, pageNumber + 1);
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
    dispatchFn({
      type: CREATE_NEW_USER,
      payload: user
    })
  })
}