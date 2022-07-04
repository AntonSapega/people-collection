import React, { useEffect, useState } from "react";
import styles from './NavCircleBtn.module.scss';

const NavCircleBtn = ({ orientation, customClick, isDisable }) => {
  const [btnDirection, setBtnDirection] = useState('left');

  useEffect(() => {
    if (orientation === 'left') {
      setBtnDirection('left');
      return;
    }
    if (orientation === 'right') {
      setBtnDirection('right');
    }
  }, [orientation])

  return (
    <span
      className={
        `material-icons
        ${styles.navigation}
        ${styles.navigation_left}
        ${isDisable ? styles.navigation_disabled : ''}`
      }
      onClick={() => customClick()}>
        {btnDirection === 'left' ? 'chevron_left' : 'chevron_right'}
    </span>
  )
}

export default NavCircleBtn;