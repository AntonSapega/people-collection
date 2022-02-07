import axios from "axios";
import { postsPath } from '../routes-variables/jsonPlaceholder';

export function getTextPlaceholder(identifier) {
  return axios.get(`${postsPath}/${identifier}`);
}