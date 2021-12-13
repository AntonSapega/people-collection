import React from 'react';
import styles from './Login-form.module.scss';

export default class LoginForm extends React.Component {

  constructor() {
    super();

    this.handleHelpCall = this.handleHelpCall.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleHelpCall() {
    alert('You must log in');
  }

  handleSubmit(event) {
    console.log('Email: ', this.state.email);
    console.log('Password: ', this.state.password);
    event.preventDefault();
  }

  handleForgotPassword() {
    console.log('Forgot password button was clicked');
  }

  handleInput(event) {
    const typeOfInput = event.target.type;

    this.setState(() => {
      return {
        [typeOfInput]: event.target.value
      }
    })
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
          <button className={styles['login-form__tip-btn']} onClick={this.handleHelpCall}>Need help?</button>
          <form className={styles['login-form__form']} onSubmit={this.handleSubmit}>
            <h2 className={styles['login-form__form-title']}>Log in</h2>

            <label className={styles['login-form__form-label']} htmlFor='email'>Email</label>
            <input
              className={styles['login-form__form-input']}
              type="email"
              placeholder='joe@email.com'
              id="email"
              onInput={this.handleInput}
              value={this.state.email}
            />

            <label className={styles['login-form__form-label']} htmlFor='password'>Password</label>
            <input
              className={styles['login-form__form-input']}
              type="password"
              placeholder='Enter your Password'
              id="password"
              onInput={this.handleInput}
              value={this.state.password}
            />
            
            <button className={styles['login-form__tip-btn']} type='button' onClick={this.handleForgotPassword}>forgot password?</button>
            <button className={styles['login-form__btn']} type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}