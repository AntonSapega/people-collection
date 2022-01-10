import React from 'react';
import styles from './Auth-form.module.scss';
import { Formik } from 'formik';
import StringButton from '../String-button/String-button';
import PrimaryButton from '../Primary-button/Primary-button';
import FormInput from './FormInput';

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

    if (!values.firstName && this.state.isRegistrationMode) {
      errors.firstName = 'You forgot specify first name';
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
      const inputFields = [
        {
          isVisible: true,
          labelTitle: 'Email',
          inputType: 'email',
          inputName:'email',
          inputValue: values.email,
          inputPlaceholder: 'joe@email.com',
          handleBlur: handleBlur,
          handleChange: handleChange,
          warningMessage: touched.email && errors.email
        },
        {
          isVisible: true,
          labelTitle: 'Password',
          inputType: 'password',
          inputName: 'password',
          inputValue: values.password,
          inputPlaceholder: 'Enter your Password',
          handleBlur: handleBlur,
          handleChange: handleChange,
          warningMessage: touched.password && errors.password
        },
        {
          isVisible: this.state.isRegistrationMode,
          labelTitle: 'Confirm Password',
          inputType: 'password',
          inputName: 'confirmPassword',
          inputValue: values.confirmPassword,
          inputPlaceholder: 'Confirm password',
          handleBlur: handleBlur,
          handleChange: handleChange,
          warningMessage: touched.confirmPassword && errors.confirmPassword
        },
        {
          isVisible: this.state.isRegistrationMode,
          labelTitle: 'First Name',
          inputType: 'text',
          inputName: 'firstName',
          inputValue: values.firstName,
          inputPlaceholder: 'Input your name',
          handleBlur: handleBlur,
          handleChange: handleChange,
          warningMessage: touched.firstName && errors.firstName
        },
        {
          isVisible: this.state.isRegistrationMode,
          labelTitle: 'Last Name',
          inputType: 'text',
          inputName: 'lastName',
          inputValue: values.lastName,
          inputPlaceholder: 'Input your last name',
          handleBlur: handleBlur,
          handleChange: handleChange,
          warningMessage: touched.lastName && errors.lastName
        }
      ]
      return (
        <form className={styles['auth-form']} onSubmit={handleSubmit}>
          <h2 className={styles['auth-form__title']}>{this.getFormValue('formTitle')}</h2>

          {inputFields.map(inputField => (
            <FormInput 
              key={inputField.inputName}
              isVisible={inputField.isVisible}
              labelTitle={inputField.labelTitle}
              inputType={inputField.inputType}
              inputName={inputField.inputName}
              inputValue={inputField.inputValue}
              inputPlaceholder={inputField.inputPlaceholder}
              handleBlur={inputField.handleBlur}
              handleChange={inputField.handleChange}
              warningMessage={inputField.warningMessage}
            />
          ))}
          
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