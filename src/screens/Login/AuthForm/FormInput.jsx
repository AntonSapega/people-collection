import React from 'react';
import styles from './AuthForm.module.scss';
import PrimaryInput from '../../../components/shared/PrimaryInput/PrimaryInput';

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
        <PrimaryInput
          labelTitle={labelTitle}
          inputType={inputType}
          inputName={inputName}
          inputPlaceholder={inputPlaceholder}
          handleBlur={handleBlur}
          handleChange={handleChange}
          inputValue={inputValue}
          warningMessage={warningMessage}
        />
        // <label className={styles['auth-form__label']}>
        //   {labelTitle}
        //   <input
        //     className={styles['auth-form__input']}
        //     type={inputType}
        //     name={inputName}
        //     placeholder={inputPlaceholder}
        //     onBlur={handleBlur}
        //     onChange={handleChange}
        //     value={inputValue}
        //   />
        //   <small className={styles['auth-form__warning-message']}>{ warningMessage }</small>
        // </label>
      }
    </>
  )
}

export default FormInput;