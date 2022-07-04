import React from 'react';
import styles from './BrandLogo.module.scss';

const BrandLogo = ({ title, description }) => {
  return (
    <section className={styles.brand}>
      <span className={`material-icons ${styles.brand__icon}`}>perm_identity</span>
      <h1 className={styles.brand__title}>{title}</h1>
      <span className={styles.brand__description}>{description}</span>
    </section>
  )
}

export default BrandLogo;