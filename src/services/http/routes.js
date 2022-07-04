const reqres = process.env.REACT_APP_REQ_RES_URL;
const jsonPlaceholder = process.env.REACT_APP_JSON_PLACEHOLDER;

export const httpRoutes = {
  authPath: `${reqres}api/register`,
  personPath: `${reqres}api/users`,
  createUserPath: `${reqres}api/users`,
  peoplePagePath: `${reqres}api/users`,
  colorsPagePath: `${reqres}api/unknown`,
  colorPath: `${reqres}api/unknown`,
  deletePersonPath: `${reqres}api/users`,
  postsPath: `${jsonPlaceholder}posts`,
}