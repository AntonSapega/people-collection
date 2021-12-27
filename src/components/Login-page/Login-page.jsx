import React, { useState } from 'react';
import LoginForm from '../Login-form/Login-form';
import styles from './Login-page.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UsersContext } from '../../utils/UsersContext';

const LoginPage = () => {

  const [formTitle] = useState('People Collection');
  const [formDescription] = useState("Try to find someone you really want to find");

  const navigate = useNavigate();
  const location = useLocation();

  async function handleForm(formValue, setUserFn) {
    console.log(formValue)
    const userData = formValue.confirmPassword ? await createNewUser(formValue, setUserFn) : await getToken(formValue);

    if (userData) {
      sessionStorage.setItem('token', userData.token);
      sessionStorage.setItem('userId', userData.id);

      navigate(location.state.from.pathname, {replace: true});
    }
  }

  async function getToken(credentials) {
    let userInfo = null;
    await axios.post(`${process.env.REACT_APP_REQ_RES_URL}api/register`, credentials)
    .then(response => {
      userInfo = response.data
    })
    .catch((error) => {
      if (error.response?.status === 400) {
        alert('User was not found')
      }
    })

    return userInfo;
  }

  async function createNewUser(userData, setNewUserFn) {
    const user = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          token: Date.now(),
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName
        })
      }, 1000)
    })

    return await user.then(result => {
      setNewUserFn([result]);
      return result;
    })
  }

  return (
    <UsersContext.Consumer>
      {context => (
        <article className={styles['login-form']}>
          <aside className={styles['login-form__left-side']}></aside>
          <LoginForm
            title={formTitle}
            description={formDescription}
            onGetForm={event => handleForm(event, context.addNewUser)}
          />
        </article>
      )}
    </UsersContext.Consumer>
  )
}

export default LoginPage;