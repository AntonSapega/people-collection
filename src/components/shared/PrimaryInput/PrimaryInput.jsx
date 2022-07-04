import React from 'react'
import styles from './PrimaryInput.module.scss';

const PrimaryInput = ( {labelTitle, inputType, inputName, inputPlaceholder, handleBlur, handleChange, inputValue, warningMessage} ) => {
  return (
    <label className={styles.label}>
      {labelTitle}
      <input
        className={styles.input}
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        onBlur={handleBlur}
        onChange={handleChange}
        value={inputValue}
      />
      <small className={styles.warningMessage}>{ warningMessage }</small>
    </label>
  )
}

export default PrimaryInput;