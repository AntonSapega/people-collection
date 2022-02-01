import axios from "axios";

export function authUser(cred) {
  return axios.post(`${process.env.REACT_APP_REQ_RES_URL}api/register`, cred);
}

export function getPerson(identifier) {
  return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users/${identifier}`)
}

export function createNewUser(userParams) {
  return axios.post(`${process.env.REACT_APP_REQ_RES_URL}api/users`, userParams);
}

export function getPeoplePage(page) {
  return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users?page=${page}`);
}

export function getColorsPage(page) {
  return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/unknown?page=${page}`);
}

export function getColor(identifier) {
  return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/unknown/${identifier}`);
}