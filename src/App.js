import React, { useState, useEffect, useContext } from 'react';
// import classes from './App.module.scss';
import LoginPage from './components/Login-page/Login-page';
import { Routes, Route, } from 'react-router-dom';
import RequireAuth from './hoc/RequireAuth';
import Layout from './components/Layout/Layout';
import HomePage from './components/Home-page/Home-page';
import UsersPage from './components/Users-page/Users-page';
import CompanyPage from './components/Company-page/Company-page';
import SettingsPage from './components/Settings-page/Settings-page';
import PersonDetailsPage from './components/PersonDetailsPage/PersonDetailsPage';
import axios from 'axios';
import { UsersContext } from './utils/UsersContext';


function App() {
  // useEffect(() => {
  //   axios.interceptors.request.use(function (config) {
  //     // Do something before request is sent
  //     console.log('Request Interceptor')
  //     return config;
  //   }, function (error) {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   });

  //   // Add a response interceptor
  //   axios.interceptors.response.use(function (response) {
  //     // Any status code that lie within the range of 2xx cause this function to trigger
  //     // Do something with response data
  //     console.log('Response')
  //     return response;
  //   }, function (error) {
  //     // Any status codes that falls outside the range of 2xx cause this function to trigger
  //     // Do something with response error
  //     return Promise.reject(error);
  //   });
  // }, [])

  //*************** */

  // const [userId, setUserId] = useState(null);

  // function handleUserInfo(info) {
  //   console.log('handleUserInfo', info);
  //   setUserId(info);
  //   console.log(userId);
  // }

  // const [usersDB, setUsersDB] = useState([]);
  const {setUsersDB} = useContext(UsersContext);

  useEffect(() => {
    getAllUsers(1);
  }, [])

  async function getAllUsers(pageNumber) {
    await usersRequest(pageNumber).then(response => {
      setUsersDB(response.data.data);

      if (response.data.page < response.data.total_pages) {
        getAllUsers(pageNumber + 1)
      }
    })
  }

  function usersRequest(pageNumber) {
    return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users?page=${pageNumber}`)
  }

  function addNewUser(user) {
    console.log('User: ', user);
    setUsersDB(prevState => [...prevState, user]);
  }

  return (
    <>
      <Routes>
        <Route path={'/'} element={
          <RequireAuth>
            {/* <Layout userId={userId} /> */}
            <Layout />
          </RequireAuth>
        }>
          <Route index element={<HomePage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path={'users/:page'} element={<UsersPage />} />
          <Route path={'users/user/:id'} element={<PersonDetailsPage />}/>
          <Route path={'settings'} element={<SettingsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>

        <Route path={'login'} element={<LoginPage onUserInfo={addNewUser} />} />
        {/* <Route path={'login'} element={<LoginPage onUserInfo={handleUserInfo} />} /> */}
      </Routes>
    </>
  );
}

export default App;
