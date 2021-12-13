import React from 'react';
import LoginForm from '../Login-form/Login-form';
import styles from './Login-page.module.scss';

export default class LoginPage extends React.Component {
  constructor() {
    super();

    this.state = {
      formTitle: 'People Collection',
      formDescription: "Try to find someone you really want to find"
    }
  }

  render() {
    return (
      <article className={styles['login-form']}>
        <aside className={styles['login-form__left-side']}></aside>
        <LoginForm
          title={this.state.formTitle}
          description={this.state.formDescription}
        />
      </article>
    )
  }
}