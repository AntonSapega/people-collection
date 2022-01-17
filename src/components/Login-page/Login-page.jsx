import React, { useState } from 'react';
import LoginForm from '../Login-form/Login-form';
import styles from './Login-page.module.scss';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UsersContext } from '../../utils/UsersContext';
import { useDispatch } from 'react-redux';
import { addNewUser, createUser } from '../../redux/actions';
import { useEffect } from 'react/cjs/react.development';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const [formTitle] = useState('People Collection');
  const [formDescription] = useState("Try to find someone you really want to find");

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);

  // useEffect(() => {
  //   if (userState !== null) {
  //     console.log('useEffect')
  //     console.log(location.state.from.pathname);
  //     navigate(location.state.from.pathname, {replace: true});
  //   }
  // }, [userState])

  async function handleForm(formValue) {
    // const userData = formValue.confirmPassword ? await dispatch(createUser(formValue)) : await getToken(formValue);


    if (formValue.confirmPassword) {
      await dispatch(createUser(formValue));
      await dispatch(addNewUser(JSON.parse(sessionStorage.getItem('createdUser'))))
      navigate(location.state.from.pathname, {replace: true});
    } else {
      await getToken(formValue)
    }

    // const inform = await userState.info;

    // console.log('Got it: ', inform);

    // if (inform !== null) {
    //   console.log('Got it: ', userState.info)
    //   navigate(location.state.from.pathname, {replace: true});
    // }

    // if (userData) {
    //   sessionStorage.setItem('token', userData.token);
    //   sessionStorage.setItem('userId', userData.id);

    //   navigate(location.state.from.pathname, {replace: true});
    // }
  }

  async function getToken(credentials) {
    let userInfo = null;
    await axios.post(`${process.env.REACT_APP_REQ_RES_URL}api/register`, credentials)
    .then(response => {
      userInfo = response.data
    })
    .catch((error) => {
      if (error.response?.status === 400) {
        alert('User was not found');
      }
    })

    return userInfo;
  }

  // async function createNewUser(userData) {
  //   const user = new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({
  //         id: Date.now(),
  //         token: Date.now(),
  //         email: userData.email,
  //         first_name: userData.firstName,
  //         last_name: userData.lastName
  //       })
  //     }, 1000)
  //   })

  //   return await user.then(result => {
  //     dispatch(addNewUser(result));
  //     return result;
  //   })
  // }

  return (
    // <UsersContext.Consumer>
    //   {context => (
    //     <article className={styles['login-form']}>
    //       <aside className={styles['login-form__left-side']}></aside>
    //       <LoginForm
    //         title={formTitle}
    //         description={formDescription}
    //         onGetForm={event => handleForm(event, context.addNewUser)}
    //       />
    //     </article>
    //   )}
    // </UsersContext.Consumer>
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