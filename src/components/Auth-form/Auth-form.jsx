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
    this.switchFormMode = this.switchFormMode.bind(this);

    this.state = {
      isRegistrationMode: false,
      formTitle: ['Log in', 'Create new account'],
      btnTitle: ['Login', 'Create'],
      formOptions: ['Create account', 'Log in']
    }
  }

  getFormValue(stateFieldName) {
    if (this.state.isRegistrationMode) {
      return this.state[stateFieldName][1];
    }
    return this.state[stateFieldName][0];
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

    if (!values.confirmPassword && this.state.isRegistrationMode) {
      errors.confirmPassword = 'Required for confirm';
    } else if (values.password && values.confirmPassword !== values.password && this.state.isRegistrationMode) {
      errors.confirmPassword = "Password doesn't match";
    }

    return errors;
  }

  submitForm(submitEvent, {resetForm}) {
    this.props.onGetForm(submitEvent);

    resetForm({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    })
  }

  switchFormMode() {
    this.setState(state => {
      return {
        isRegistrationMode: !state.isRegistrationMode
      }
    })
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
          <h2 className={styles['auth-form__title']}>{this.getFormValue('formTitle')}</h2>
  
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
  
          <label className={styles['auth-form__label']} htmlFor='password'>
            Password
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

          {this.state.isRegistrationMode && 
            <>
              <label className={`${styles['auth-form__label']} ${styles['auth-form__confirm-password']}`} htmlFor='confirm-password'>
                Confirm Password
                <input
                  className={styles['auth-form__input']}
                  type="password"
                  name="confirmPassword"
                  placeholder='Confirm password'
                  id="confirm-password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                <small className={styles['auth-form__warning-message']}>{ errors.confirmPassword && touched.confirmPassword && errors.confirmPassword }</small>
              </label>

              <label className={`${styles['auth-form__label']} ${styles['auth-form__confirm-password']}`} htmlFor='first-name'>
                First Name
                <input
                  className={styles['auth-form__input']}
                  type="text"
                  name="firstName"
                  placeholder='Confirm password'
                  id="first-name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                />
                <small className={styles['auth-form__warning-message']}>{ errors.confirmPassword && touched.confirmPassword && errors.confirmPassword }</small>
              </label>

              <label className={`${styles['auth-form__label']} ${styles['auth-form__confirm-password']}`} htmlFor='last-name'>
                Last Name
                <input
                  className={styles['auth-form__input']}
                  type="text"
                  name="lastName"
                  placeholder='Confirm password'
                  id="last-name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                />
                <small className={styles['auth-form__warning-message']}>{ errors.confirmPassword && touched.confirmPassword && errors.confirmPassword }</small>
              </label>
            </>
          }
          
          <div className={styles['auth-form__tip-btn']}>
            <StringButton handleClick={this.switchFormMode}>{this.getFormValue('formOptions')}</StringButton>
          </div>

          <div className={styles['auth-form__primary-button-wrapper']}>
            <PrimaryButton
              type={'submit'}
              isDisable={
                errors.email ||
                errors.password ||
                errors.confirmPassword ||
                values.email.length === 0 ||
                values.password.length === 0
                }>
              {this.getFormValue('btnTitle')}
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
          firstName: '',
          lastName: '',
          confirmPassword: ''
        }}
        validate={this.validators}
        onSubmit={this.submitForm}
      >
        {authForm}
      </Formik>
    )
  }
}