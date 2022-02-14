import React from "react";
import styles from './MainButton.module.scss';

const colorsEnum = [
  'positive',
  'negative',
  'neutral',
  'main_app ',
  'alternative_app',
]

const MainButton = ( {children, btnStyles, onCustomClick, colorStyle} ) => {
  return (
    <button className={`${styles.btn} ${styles[colorStyle]}`} style={btnStyles} onClick={onCustomClick}>
      {children}
    </button>
  )
}

export default MainButton;