import React, { useEffect } from 'react';
import LoginPage from './screens/Login/LoginPage/LoginPage';
import { Routes, Route, } from 'react-router-dom';
import RequireAuth from './hoc/RequireAuth';
import Layout from './components/Layout/Layout';
import HomePage from './screens/Home/HomePage/HomePage';
import PeoplePage from './screens/People/People-page/People-page';
import SettingsPage from './screens/SettingsPage/SettingsPage';
import PersonDetailsPage from './screens/PersonDetails/PersonDetailsPage/PersonDetailsPage';
import ColorsPage from './screens/Colors/ColorsPage/ColorsPage';
import ColorDetailsPage from './screens/ColorDetails/ColorDetailsPage/ColorDetailsPage';
import { useDispatch } from 'react-redux';
import loaderController from './interceptors/loaderController';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    loaderController(dispatch);
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
          <Route path={'people/:page'} element={<PeoplePage />} />
          <Route path={'people/person/:id'} element={<PersonDetailsPage />}/>
          <Route path={'settings'} element={<SettingsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>

        <Route path={'login'} element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
