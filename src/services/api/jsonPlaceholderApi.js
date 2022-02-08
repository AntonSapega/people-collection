import axios from "axios";
import { httpRoutes } from "../http/routes";

export function getTextPlaceholder(identifier) {
  return axios.get(`${httpRoutes.postsPath}/${identifier}`);
}