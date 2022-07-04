import React from 'react';
import styles from './Primary-button.module.scss';

const PrimaryButton = (props) => {
  return (
    <button 
      className={styles['primary-button']}
      onClick={props.handleClick}
      type={props.type}
      disabled={props.isDisable}
    >
      {props.children}
    </button>
  )
}

export default PrimaryButton;