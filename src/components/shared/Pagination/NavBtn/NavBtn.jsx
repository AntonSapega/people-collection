import React from "react";
import styles from './NavBtn.module.scss';

const NavBtn = ( {children, handleClick, isDisable, active} ) => {
  const btnImageStyle = [`${styles.navButton} ${active ? styles['navButton_active'] : ''}`];

  return (
    <button className={btnImageStyle} onClick={() => handleClick()} disabled={isDisable}>
      {children}
    </button>
  )
}

export default NavBtn;