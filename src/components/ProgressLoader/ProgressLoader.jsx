import React from "react";
import { useSelector } from "react-redux";
import styles from './ProgressLoader.module.scss';

const ProgressLoader = () => {
  const isActive = useSelector(state => state.app.loader.pendingRequests);

  return (
    <>
      {isActive > 0 &&
        <section className={styles['progress-bar-container']}>
          <div className={styles['progress-bar']} >
            <div className={styles['progress-bar__snake']} ></div>
            <div className={styles['progress-bar__snake-shadow']}></div>
          </div>
        </section>
      }
    </>
  )
}

export default ProgressLoader;