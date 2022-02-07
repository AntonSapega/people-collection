import axios from "axios";

export function getTextPlaceholder(identifier) {
  return axios.get(`${process.env.REACT_APP_JSON_PLACEHOLDER}posts/${identifier}`);
}