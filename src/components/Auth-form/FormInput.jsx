import React from 'react';
import styles from './Auth-form.module.scss';

const FormInput = ({
  labelTitle,
  inputType,
  inputName,
  inputValue,
  inputPlaceholder,
  handleBlur,
  handleChange,
  warningMessage,
  isVisible }) => {
  return (
    <>
      {isVisible &&
        <label className={styles['auth-form__label']}>
          {labelTitle}
          <input
            className={styles['auth-form__input']}
            type={inputType}
            name={inputName}
            placeholder={inputPlaceholder}
            onBlur={handleBlur}
            onChange={handleChange}
            value={inputValue}
          />
          <small className={styles['auth-form__warning-message']}>{ warningMessage }</small>
        </label>
      }
    </>
  )
}

export default FormInput;