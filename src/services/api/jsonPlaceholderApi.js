import axios from "axios";
import { ROUTES } from "../../enums/ROUTES";

export function getTextPlaceholder(identifier) {
  return axios.get(`${ROUTES.postsPath}/${identifier}`);
}