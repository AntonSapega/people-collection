import React, { useEffect } from 'react';
import Login from '../screens/Login/Login';
import { Routes, Route, } from 'react-router-dom';
import RequireAuth from '../hoc/RequireAuth';
import Layout from '../layouts/Layout/Layout';
import Home from '../screens/Home/Home';
import People from '../screens/People/People';
import Settings from '../screens/Settings/Settings';
import PersonDetails from '../screens/PersonDetails/PersonDetails';
import Colors from '../screens/Colors/Colors';
import ColorDetails from '../screens/ColorDetails/ColorDetails';
import { useDispatch } from 'react-redux';
import loaderController from '../interceptors/loaderController';
import { ROUTES } from '../enums/ROUTES';
import ColorsSet from '../screens/Colors/ColorsSet/ColorsSet';
import PeopleSet from '../screens/People/PeopleSet/PeopleSet';


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
          <Route index element={<Home />} />
          <Route path={`${ROUTES.colors}`} element={<Colors />}>
            <Route path=':page' element={<ColorsSet />} />
          </Route>
          <Route path={`${ROUTES.color}/:id`} element={<ColorDetails />} />
          <Route path={`${ROUTES.people}`} element={<People />}>
            <Route path=':page' element={<PeopleSet />} />
          </Route>
          <Route path={`${ROUTES.person}/:id`} element={<PersonDetails />}/>
          <Route path={ROUTES.settings} element={<Settings />} />
          <Route path={ROUTES.notFound} element={<Home />} />
        </Route>

        <Route path={ROUTES.authorization} element={<Login />} />
      </Routes>
    </>
  );
}

export default App;