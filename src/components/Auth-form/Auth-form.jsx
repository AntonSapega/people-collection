import React from 'react';
import styles from './Auth-form.module.scss';
import { Formik } from 'formik';
import StringButton from '../String-button/String-button';
import PrimaryButton from '../Primary-button/Primary-button';

export default class AuthForm extends React.Component {

  constructor(props) {
    super(props);

    this.validators = this.validators.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  validators(values) {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 3) {
      errors.password = 'Invalid password (It should be more longer)'
    }

    return errors;
  }

  submitForm(submitEvent) {
    this.props.onGetForm(submitEvent);
  }

  handleForgotPassword() {
    alert('It happens');
  }

  render() {

    const authForm = ({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
    }) => {
      return (
        <form className={styles['auth-form']} onSubmit={handleSubmit}>
          <h2 className={styles['auth-form__title']}>Log in</h2>
  
          <label className={styles['auth-form__label']}>
            Email
            <input
              className={styles['auth-form__input']}
              type="email"
              name="email"
              placeholder='joe@email.com'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
            />
            <small className={styles['auth-form__warning-message']}>{ errors.email && touched.email && errors.email }</small>
          </label>
  
          <label className={styles['auth-form__label']} htmlFor='password'>Password
            <input
              className={styles['auth-form__input']}
              type="password"
              name="password"
              placeholder='Enter your Password'
              id="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
            />
            <small className={styles['auth-form__warning-message']}>{ errors.password && touched.password && errors.password }</small>
          </label>
          
          <div className={styles['auth-form__tip-btn']}>
            <StringButton handleClick={this.handleForgotPassword}>forgot password?</StringButton>
          </div>

          <div className={styles['auth-form__primary-button-wrapper']}>
            <PrimaryButton type={'submit'} isDisable={errors.email || errors.password || values.email.length === 0 || values.password.length === 0}>
              Login
            </PrimaryButton>
          </div>
        </form>
      )
    }

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={this.validators}
        onSubmit={this.submitForm}
      >
        {authForm}
      </Formik>
    )
  }
}