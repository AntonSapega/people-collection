import axios from "axios";

const addMockUserToPeoplePageResponse = (people) => {
  const savedUser = JSON.parse(sessionStorage.getItem('user'));

  axios.interceptors.response.use(response => {
    if (savedUser &&
        response.request.responseURL.split('=')[0] === `${process.env.REACT_APP_REQ_RES_URL}api/users?page`) {
      if (response.data.total_pages === response.data.page) {
        const userInPeopleArray = people.find(person => person.id === savedUser.id);
        console.log(userInPeopleArray)
        if (!userInPeopleArray) {
          response.data.data.push(savedUser);
          console.log('INTERCEPTOR FOR ADD USER: ', response.data.data)
        }
      }
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
}

export default addMockUserToPeoplePageResponse;