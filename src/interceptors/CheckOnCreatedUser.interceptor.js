import axios from "axios";

const addNewUserToUsersDB = () => {
  axios.interceptors.response.use(response => {
    if (sessionStorage.getItem('createdUser') &&
        response.request.responseURL.split('=')[0] === 'https://reqres.in/api/users?page') {
      if (response.data.total_pages === response.data.page) {
        response.data.data.push(JSON.parse(sessionStorage.getItem('createdUser')));
      }
      // response.data.total_pages++;
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
}

export default addNewUserToUsersDB;