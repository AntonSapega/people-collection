import axios from "axios";

const addMockUserToPeopleCollection = () => {
  const savedUser = JSON.parse(sessionStorage.getItem('user'));

  axios.interceptors.response.use(response => {
    if (savedUser &&
        response.request.responseURL.split('=')[0] === `${process.env.REACT_APP_REQ_RES_URL}api/users?page`) {
      if (response.data.total_pages === response.data.page) {
        response.data.data.push(savedUser);
      }
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
}

export default addMockUserToPeopleCollection;