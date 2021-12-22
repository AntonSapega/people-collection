import React from "react";
import styles from './MainButton.module.scss';

const MainButton = ( {children, btnStyles, onCustomClick} ) => {
  return (
    <button className={styles['main-button']} style={btnStyles} onClick={onCustomClick}>
      {children}
    </button>
  )
}

export default MainButton;