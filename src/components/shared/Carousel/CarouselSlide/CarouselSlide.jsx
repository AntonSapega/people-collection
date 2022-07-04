import React from 'react';
import styles from './CarouselSlide.module.scss';

const CarouselSlide = ({ slide, seeDetails }) => {
  return (
    <section className={styles.slide}>
      <img className={styles.avatar} src={slide?.avatar} alt={`${slide?.first_name} ${slide?.last_name}`} />
      <h2 className={styles.full_name}>{`${slide?.first_name} ${slide?.last_name}`}</h2>
      <h3 className={styles.email}>
        <span className={`material-icons-outlined ${styles.email__icon}`}>mail</span>
        {slide?.email}
      </h3>
      <p className={styles.description}>{slide.info}</p>
      <nav className={styles.navigation}>
        <button type='button' className={styles.navigation__link} onClick={() => seeDetails(slide)}>See details</button>
      </nav>
    </section>
  )
};

export default CarouselSlide;