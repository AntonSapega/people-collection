import React, { useState } from 'react';
import LoginForm from '../Login-form/Login-form';
import styles from './Login-page.module.scss';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [formTitle] = useState('People Collection');
  const [formDescription] = useState("Try to find someone you really want to find");

  const navigate = useNavigate();

  function handleForm(data) {
    if (data.email === 'test@mail.com' && data.password === '123456') {
      sessionStorage.setItem('token', 'true');
    } else {
      sessionStorage.setItem('token', 'false');
    }

    navigate('/', {replace: true});
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