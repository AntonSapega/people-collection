import React from "react";
import { Formik } from "formik";
import styles from './Auth-form.module.scss';
import FormInput from "./FormInput";
import StringButton from "../String-button/String-button";
import PrimaryButton from "../Primary-button/Primary-button";

const FormikForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isRegistrationMode
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
        isVisible: isRegistrationMode,
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
        isVisible: isRegistrationMode,
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
        isVisible: isRegistrationMode,
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

export default FormikForm;