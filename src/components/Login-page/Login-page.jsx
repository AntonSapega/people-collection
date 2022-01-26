import React, { useEffect, useState } from 'react';
import LoginForm from '../Login-form/Login-form';
import styles from './Login-page.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, createUserWithSaga, getLoggedUser, authUser } from '../../redux/actions';

const LoginPage = () => {
  const [formTitle] = useState('People Collection');
  const [formDescription] = useState("Try to find someone you really want to find");

  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(state => state.user.info);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate(location.state.from.pathname, {replace: true});
    }
  }, [user])

  // async function handleForm(formValue) {
  //   if (formValue.confirmPassword) {
  //     await dispatch(createUser(formValue));
  //   } else {
  //     await dispatch(getLoggedUser(formValue));
  //   }
  //   navigate(location.state.from.pathname, {replace: true});
  // }

  function handleFormWithSaga(formValue) {
    if (formValue.confirmPassword) {
      dispatch(createUserWithSaga(formValue));
      return;
    }
    dispatch(authUser(formValue));
  }

  return (
    <div className={styles['login-form']}>
      <aside className={styles['login-form__left-side']}></aside>
      <LoginForm
        title={formTitle}
        description={formDescription}
        onGetForm={event => handleFormWithSaga(event)}
      />
    </div>
  )
}

export default LoginPage;