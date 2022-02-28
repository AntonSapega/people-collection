import React, { useState } from 'react';
import LoginForm from '../Login-form/Login-form';
import styles from './Login-page.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions';
import { getLoggedUser } from '../../redux/actions';

const LoginPage = () => {
  const [formTitle] = useState('People Collection');
  const [formDescription] = useState("Try to find someone you really want to find");

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  async function handleForm(formValue) {
    if (formValue.confirmPassword) {
      await dispatch(createUser(formValue));
    } else {
      await dispatch(getLoggedUser(formValue));
    }
    navigate(location.state.from.pathname, {replace: true});
  }

  return (
    <div className={styles['login-form']}>
      <aside className={styles['login-form__left-side']}></aside>
      <LoginForm
        title={formTitle}
        description={formDescription}
        onGetForm={event => handleForm(event)}
      />
    </div>
  )
}

export default LoginPage;