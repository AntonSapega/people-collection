import axios from "axios";
import { ROUTES } from "../../enums/ROUTES";

export function authUser(cred) {
  return axios.post(ROUTES.authPath, cred);
}

export function getPerson(identifier) {
  return axios.get(`${ROUTES.personPath}/${identifier}`);
}

export function createNewUser(userParams) {
  return axios.post(ROUTES.createUserPath, userParams);
}

export function getPeoplePage(page) {
  return axios.get(`${ROUTES.peoplePagePath}?page=${page}`);
}

export function getColorsPage(page) {
  return axios.get(`${ROUTES.colorsPagePath}?page=${page}`);
}

export function getColor(identifier) {
  return axios.get(`${ROUTES.colorPath}/${identifier}`);
}

export function deletePerson(identifier) {
  return axios.delete(`${ROUTES.deletePersonPath}/${identifier}`);
}