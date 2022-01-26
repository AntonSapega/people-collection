import React, { useEffect } from 'react';
import LoginPage from './components/Login-page/Login-page';
import { Routes, Route, } from 'react-router-dom';
import RequireAuth from './hoc/RequireAuth';
import Layout from './components/Layout/Layout';
import HomePage from './components/Home-page/Home-page';
import PeoplePage from './components/People-page/People-page';
import SettingsPage from './components/Settings-page/Settings-page';
import PersonDetailsPage from './components/PersonDetailsPage/PersonDetailsPage';
import ColorsPage from './components/ColorsPage/ColorsPage';
import ColorDetailsPage from './components/ColorDetailsPage/ColorDetailsPage';
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
