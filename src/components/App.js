import React, { useEffect } from 'react';
import Login from '../screens/Login/Login';
import { Routes, Route, } from 'react-router-dom';
import RequireAuth from '../hoc/RequireAuth';
import AppLayout from '../layouts/AppLayout/AppLayout';
import Home from '../screens/Home/Home';
import People from '../screens/People/People';
import Settings from '../screens/Settings/Settings';
import PersonDetails from '../screens/PersonDetails/PersonDetails';
import Colors from '../screens/Colors/Colors';
import ColorDetails from '../screens/ColorDetails/ColorDetails';
import { useDispatch } from 'react-redux';
import loaderController from '../interceptors/loaderController';
import { ROUTES } from '../enums/ROUTES';
import ColorsList from '../screens/Colors/ColorsList/ColorsList';
import PeopleList from '../screens/People/PeopleList/PeopleList';


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
            <AppLayout />
          </RequireAuth>
        }>
          <Route index element={<Home />} />
          <Route path={`${ROUTES.colors}`} element={<Colors />}>
            <Route path=':page' element={<ColorsList />} />
          </Route>
          <Route path={`${ROUTES.color}/:id`} element={<ColorDetails />} />
          <Route path={`${ROUTES.people}`} element={<People />}>
            <Route path=':page' element={<PeopleList />} />
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