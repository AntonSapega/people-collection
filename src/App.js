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
import { ROUTES } from './enums/ROUTES';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    loaderController(dispatch);
  }, [])

  return (
    <>
      <Routes>
        <Route path={ROUTES.initial} element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.colors} element={<ColorsPage />} />
          <Route path={ROUTES.color} element={<ColorDetailsPage />} />
          <Route path={ROUTES.people} element={<PeoplePage />} />
          <Route path={ROUTES.person} element={<PersonDetailsPage />}/>
          <Route path={ROUTES.settings} element={<SettingsPage />} />
          <Route path={ROUTES.notFound} element={<HomePage />} />
        </Route>

        <Route path={'login'} element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
