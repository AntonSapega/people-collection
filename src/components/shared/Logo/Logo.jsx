import React from "react";
import styles from './Logo.module.scss';
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../enums/ROUTES";

const Logo = ({ logoStyle = 'positive' }) => {
  const negativeStyle = {
    imgBase: null,
    icon: null,
    title: null
  }

  if (logoStyle === 'negative') {
    negativeStyle.imgBase = styles['logo__img_negative'];
    negativeStyle.icon = styles['logo__img-icon_negative'];
    negativeStyle.title = styles['logo__title_negative'];
  }

  return (
    <NavLink className={styles.logo} to={ROUTES.initial}>
      <div className={`${styles.logo__img} ${negativeStyle.imgBase}`}>
        <span className={`material-icons ${styles['logo__img-icon']} ${negativeStyle.icon}`}>people_alt</span>
      </div>
      <h1 className={`${styles.logo__title} ${negativeStyle.title}`}>
        Pe<span className={styles.logo__ordinaryText}>ople</span>
        Co<span className={styles.logo__ordinaryText}>llection</span>
      </h1>
    </NavLink>
  )
}

export default Logo;