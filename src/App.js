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
  useEffect(() => {
    // axios.interceptors.request.use(config => {
    //   // Do something before request is sent
    //   const getUserUrlParams = config.url.split("https://reqres.in/api/unknown/");

    //   if (!getUserUrlParams[0] && JSON.parse(sessionStorage.getItem('createdUser')).id === Number(getUserUrlParams[1])) {
    //     console.log('Got it')
    //     throw new axios.Cancel('Operation canceled by the user.')
    //     return;
    //   }

    //   return config;
    // }, function (error) {
    //   // Do something with request error
    //   return Promise.reject(error);
    // });

    // Add a response interceptor
    axios.interceptors.response.use(response => {
      if (sessionStorage.getItem('createdUser') &&
          JSON.parse(sessionStorage.getItem('createdUser')) &&
          response.request.responseURL.split('=')[0] === 'https://reqres.in/api/users?page') {
        if (response.data.total_pages === response.data.page) {
          response.data.data.push(JSON.parse(sessionStorage.getItem('createdUser')));
        }
        response.data.total_pages++;
      }
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });
  }, [])

  //*************** */


  const {initUsersDB, addNewUser} = useContext(UsersContext);

  useEffect(() => {
    getAllUsers(1);
  }, [])

  async function getAllUsers(pageNumber) {
    await usersRequest(pageNumber).then(response => {
      initUsersDB(response.data.data);

      if (response.data.page < response.data.total_pages) {
        getAllUsers(pageNumber + 1)
      }

      if (response.data.page === response.data.total_pages && JSON.parse(sessionStorage.getItem('createdUser'))) {
        console.log('Work')
        const user = JSON.parse(sessionStorage.getItem('createdUser'));
        addNewUser([user]);
      }
    })
  }

  function usersRequest(pageNumber) {
    return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users?page=${pageNumber}`)
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

        <Route path={'login'} element={<LoginPage />} />
        {/* <Route path={'login'} element={<LoginPage onUserInfo={handleUserInfo} />} /> */}
      </Routes>
    </>
  );
}

export default App;
