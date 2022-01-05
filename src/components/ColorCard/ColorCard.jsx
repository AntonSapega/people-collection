import React from 'react';
import styles from './ColorCard.module.scss';

const ColorCard = ({color, name, style}) => {
  return (
    <figure style={{backgroundColor: color, ...style}} className={styles['color-card']}>
      <figcaption className={styles['color-card__description']}>{name}</figcaption>
    </figure>
  )
}

export default ColorCard;