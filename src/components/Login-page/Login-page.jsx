import React, { useState, useEffect } from 'react';
import LoginForm from '../Login-form/Login-form';
import styles from './Login-page.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ( {onUserInfo} ) => {

  const [formTitle] = useState('People Collection');
  const [formDescription] = useState("Try to find someone you really want to find");

  const navigate = useNavigate();
  const location = useLocation();

  async function handleForm(formValue) {
    const userData = await getToken(formValue);
    console.log(userData);

    if (userData) {
      sessionStorage.setItem('token', userData.token);
      console.log('userID: ', userData)
      sessionStorage.setItem('userId', userData.id);
      console.log(location.state)
      navigate(location.state.from.pathname, {replace: true});
    }
  }

  async function getToken(credentials) {
    let userInfo = null;
    await axios.post(`${process.env.REACT_APP_REQ_RES_URL}api/register`, credentials)
    .then(response => {
      console.log(response);
      userInfo = response.data
      onUserInfo(response.data);
    })
    .catch((error) => {
      if (error.response.status === 400) {
        alert('User was not found')
      }
    })

    return userInfo;
  }

  return (
    <article className={styles['login-form']}>
      <aside className={styles['login-form__left-side']}></aside>
      <LoginForm
        title={formTitle}
        description={formDescription}
        onGetForm={handleForm}
      />
    </article>
  )
}

export default LoginPage;





// export default class LoginPage extends React.Component {
//   constructor() {
//     super();
//     this.handleForm = this.handleForm.bind(this);

//     this.state = {
//       formTitle: 'People Collection',
//       formDescription: "Try to find someone you really want to find"
//     }
//   }

  // handleForm(data) {
  //   console.log(data);
  //   if (data.email === 'test@mail.com' && data.password === '123456') {
  //     localStorage.setItem('token', 'true');
  //   } else {
  //     localStorage.setItem('token', 'false');
  //   }
  // }

//   render() {
//     return (
//       <article className={styles['login-form']}>
//         <aside className={styles['login-form__left-side']}></aside>
//         <LoginForm
//           title={this.state.formTitle}
//           description={this.state.formDescription}
//           onGetForm={this.handleForm}
//         />
//       </article>
//     )
//   }
// }