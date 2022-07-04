import axios from "axios";
import { httpRoutes } from "../http/routes";

export function authUser(cred) {
  return axios.post(httpRoutes.authPath, cred);
}

export function getPerson(identifier) {
  return axios.get(`${httpRoutes.personPath}/${identifier}`);
}

export function createNewUser(userParams) {
  return axios.post(httpRoutes.createUserPath, userParams);
}

export function getPeoplePage(page) {
  return axios.get(`${httpRoutes.peoplePagePath}?page=${page}`);
}

export function getColorsPage(page) {
  return axios.get(`${httpRoutes.colorsPagePath}?page=${page}`);
}

export function getColor(identifier) {
  return axios.get(`${httpRoutes.colorPath}/${identifier}`);
}

export function deletePerson(identifier) {
  return axios.delete(`${httpRoutes.deletePersonPath}/${identifier}`);
}