import React from 'react'
import { createPortal } from 'react-dom';
import MainButton from '../shared/MainButton/MainButton';
import styles from './Modal.module.scss';

const Modal = ( {children, title, type, userChoice} ) => {
  function handleUserAction(result) {
    return userChoice(result);
  }

  return createPortal(
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div className={styles.content}>
            <div className={styles.content__iconWrapper}>
              <div className={styles.content__icon}>
                <span className={`material-icons ${styles.content__iconExclamationMark}`}>info</span>
              </div>
            </div>
            <section className={styles.content__text}>
              <h2 className={styles.content__title}>{title}</h2>
              <p className={styles.content__description}>{children}</p>
            </section>
          </div>
          <div className={styles.actions}>
            {type === 'action' &&
            <>
              <MainButton
                onCustomClick={() => handleUserAction(false)}
                colorStyle={'positive'}>Cancel</MainButton>
              <MainButton
                onCustomClick={() => handleUserAction(true)}
                colorStyle={'negative'}
                btnStyles={{marginLeft: '1rem'}}>Delete</MainButton>
            </>
            }
            {type === 'confirm' &&
              <MainButton
                onCustomClick={() => handleUserAction(false)}
                colorStyle={'neutral'}>Confirm</MainButton>
            }
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal'));
}

export default Modal;