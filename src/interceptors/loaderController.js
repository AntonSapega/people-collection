import axios from "axios";
import { onLoader, offLoader } from "../store/app/actions";

const loaderController = (dispatchFn) => {
  axios.interceptors.request.use(function (request) {
    dispatchFn(onLoader());
    return request;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  axios.interceptors.response.use(response => {
    setTimeout(() => {
      dispatchFn(offLoader());
    }, 1500)
    return response;
  }, (error) => {
    setTimeout(() => {
      dispatchFn(offLoader());
    }, 1000)
    return Promise.reject(error);
  }
  );
}

export default loaderController;