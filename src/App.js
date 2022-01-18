import React, { useEffect } from 'react';
import LoginPage from './components/Login-page/Login-page';
import { Routes, Route, } from 'react-router-dom';
import RequireAuth from './hoc/RequireAuth';
import Layout from './components/Layout/Layout';
import HomePage from './components/Home-page/Home-page';
import UsersPage from './components/Users-page/Users-page';
import SettingsPage from './components/Settings-page/Settings-page';
import PersonDetailsPage from './components/PersonDetailsPage/PersonDetailsPage';
import ColorsPage from './components/ColorsPage/ColorsPage';
import ColorDetailsPage from './components/ColorDetailsPage/ColorDetailsPage';
import addNewUserToUsersDB from './interceptors/CheckOnCreatedUser.interceptor';
import { useDispatch, useSelector } from 'react-redux';
import { initPeopleCollection } from './redux/actions';
import retrieveUser from './interceptors/retrieveUser';


function App() {

  const user = useSelector(state => state.user.info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initPeopleCollection());
    addNewUserToUsersDB();
    retrieveUser(dispatch);
  }, [])

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
