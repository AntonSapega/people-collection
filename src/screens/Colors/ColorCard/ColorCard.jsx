import React from 'react';
import { useRef } from 'react';
import useScaleStyle from '../../../hooks/useScaleStyle';
import styles from './ColorCard.module.scss';

const ColorCard = ({onColorCard, color, name, style}) => {
  const ref = useRef();
  const isScaling = useScaleStyle(ref);

  return (
    <figure ref={ref} style={{backgroundColor: color, ...isScaling, ...style}} className={styles['color-card']} onClick={onColorCard}>
      <figcaption className={styles['color-card__description']}>{name}</figcaption>
    </figure>
  )
}

export default ColorCard;