import React from 'react';
import styles from './Login-form.module.scss';
import AuthForm from '../Auth-form/Auth-form';
import StringButton from '../String-button/String-button';

export default class LoginForm extends React.Component {

  constructor() {
    super();

    this.handleHelpCall = this.handleHelpCall.bind(this);
  }

  handleHelpCall() {
    alert('You must log in');
  }


  render() {
    return (
      <div className={styles['login-form']}>
        <aside className={styles['login-form__left-side']}>
          <span className={`material-icons ${styles['login-form__icon']}`}>perm_identity</span>
          <h1 className={styles['login-form__title']}>{this.props.title}</h1>
          <span className={styles['login-form__description']}>{this.props.description}</span>
        </aside>
        <div className={styles['login-form__right-side']}>
          <div className={styles['login-form__btn-tip']}>
            <StringButton handleClick={this.handleHelpCall}>Need help?</StringButton>
          </div>
          
          <AuthForm />
        </div>
      </div>
    )
  }
}