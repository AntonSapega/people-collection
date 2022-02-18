import React from 'react';
import styles from './NothingFound.module.scss';

const NothingFound = () => {
  return (
    <section className={styles.container}>
      <span className={`${styles.face} material-icons`}>mood_bad</span>
      <div className={styles.shadow}></div>
      <h3 className={styles.text}>Nothing found!</h3>
    </section>
  )
}

export default NothingFound;