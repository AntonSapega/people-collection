import React, { useState } from 'react';
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


function App() {
  console.log('App was render')
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

  const [userId, setUserId] = useState(null);

  function handleUserInfo(info) {
    console.log('handleUserInfo', info);
    setUserId(info);
    console.log(userId);
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

        <Route path={'login'} element={<LoginPage onUserInfo={handleUserInfo} />} />
      </Routes>
    </>
  );
}

export default App;
