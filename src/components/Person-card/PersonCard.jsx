import React from 'react'
import styles from './PersonCard.module.scss';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';

const PersonCard = ({user, onCardClick}) => {
  const pictureStyles = {
    marginRight: '16px',
    height: '120px',
    width: '120px',
    borderRadius: '9999px',
    fontSize: '2.5rem'
  }

  return (
    <div className={styles['person-id-card']} onClick={() => onCardClick(user.id)}>
      <section className={styles['person-id-card__main-info']}>
        {user.avatar &&
          <img style={pictureStyles} src={user.avatar} alt="person" />
        }

        {!user.avatar &&
          <ImagePlaceholder firstWord={user.first_name} secondWord={user.last_name} imgStyles={pictureStyles} />
        }
        <h2 className={styles['person-id-card__full-name']}>{user.first_name} {user.last_name}</h2>
      </section>
      <span className={styles['person-id-card__email']}>Email: {user.email}</span>
    </div>
  )
}

export default PersonCard;