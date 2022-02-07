import axios from "axios";
import {
  authPath,
  personPath,
  createUserPath,
  peoplePagePath,
  colorsPagePath,
  colorPath,
  deletePersonPath,
} from '../routes-variables/reqres';

export function authUser(cred) {
  return axios.post(authPath, cred);
}

export function getPerson(identifier) {
  return axios.get(`${personPath}/${identifier}`);
}

export function createNewUser(userParams) {
  return axios.post(createUserPath, userParams);
}

export function getPeoplePage(page) {
  return axios.get(`${peoplePagePath}?page=${page}`);
}

export function getColorsPage(page) {
  return axios.get(`${colorsPagePath}?page=${page}`);
}

export function getColor(identifier) {
  return axios.get(`${colorPath}/${identifier}`);
}

export function deletePerson(identifier) {
  return axios.delete(`${deletePersonPath}/${identifier}`);
}