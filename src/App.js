import React, { useEffect, useContext } from 'react';
import LoginPage from './components/Login-page/Login-page';
import { Routes, Route, } from 'react-router-dom';
import RequireAuth from './hoc/RequireAuth';
import Layout from './components/Layout/Layout';
import HomePage from './components/Home-page/Home-page';
import UsersPage from './components/Users-page/Users-page';
import SettingsPage from './components/Settings-page/Settings-page';
import PersonDetailsPage from './components/PersonDetailsPage/PersonDetailsPage';
import axios from 'axios';
import { UsersContext } from './utils/UsersContext';
import ColorsPage from './components/ColorsPage/ColorsPage';
import ColorDetailsPage from './components/ColorDetailsPage/ColorDetailsPage';
import addNewUserToUsersDB from './interceptors/CheckOnCreatedUser.interceptor';


function App() {

  const {initUsersDB, addNewUser} = useContext(UsersContext);

  useEffect(() => {
    addNewUserToUsersDB();
    getAllUsers(1);
  }, [])

  async function getAllUsers(pageNumber) {
    await usersRequest(pageNumber).then(response => {
      initUsersDB(response.data.data);

      if (response.data.page < response.data.total_pages) {
        getAllUsers(pageNumber + 1)
      }

      if (response.data.page === response.data.total_pages && JSON.parse(sessionStorage.getItem('createdUser'))) {
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
            <Layout />
          </RequireAuth>
        }>
          <Route index element={<HomePage />} />
          <Route path="/colors/:page" element={<ColorsPage />} />
          <Route path="/colors/color-details/:id" element={<ColorDetailsPage />} />
          <Route path={'users/:page'} element={<UsersPage />} />
          <Route path={'users/user/:id'} element={<PersonDetailsPage />}/>
          <Route path={'settings'} element={<SettingsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>

        <Route path={'login'} element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
