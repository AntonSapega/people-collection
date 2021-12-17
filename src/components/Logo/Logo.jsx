import React from "react";
import styles from './Logo.module.scss';
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <NavLink className={styles.logo} to="/">
      <div className={styles.logo__img}>
        <span className={`material-icons ${styles['logo__img-icon']}`}>people_alt</span>
      </div>
      <h1 className={styles['logo__title']}>PeopleCollection</h1>
    </NavLink>
  )
}

export default Logo;