import axios from "axios";
import { addNewPerson, setUser } from "../redux/actions";

const retrieveUser = (dispatchFn) => {
  axios.interceptors.response.use(response => {
    const savedUser = JSON.parse(sessionStorage.getItem('user'));
    if (savedUser) {
      // dispatchFn(addNewPerson(savedUser)); // случай когда пользователь получен с сервера и уже существует в массиве не обрабатывается
      // dispatchFn(setUser(savedUser));
    }
    return response;
  });
}

export default retrieveUser;