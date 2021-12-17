import React from 'react'
import styles from './PersonCard.module.scss';

const PersonCard = ({user}) => {
  return (
    <div className={styles['person-id-card']}>
      <section className={styles['person-id-card__main-info']}>
        <img className={styles['person-id-card__img']} src={user.avatar} alt="person" />
        <h2 className={styles['person-id-card__full-name']}>{user.first_name} {user.last_name}</h2>
      </section>
      <span className={styles['person-id-card__email']}>Email: {user.email}</span>
    </div>
  )
}

export default PersonCard;