import React from 'react'
import styles from './Footer.module.scss';
import Logo from '../../components/shared/Logo/Logo';

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles.logoWrapper}>
        <Logo logoStyle='negative'/>
      </div>
    </footer>
  )
}

export default Footer;