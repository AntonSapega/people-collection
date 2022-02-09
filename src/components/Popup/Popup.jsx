import React from "react";
import styles from './Popup.module.scss';
import MainButton from '../shared/MainButton/MainButton';

const Popup = ({ question, type, userChoice }) => {

  return (
    <div className={styles.background}>
      <section className={styles.popup}>
        <h4 className={styles.popupHeader}>Please make sure that your actions are correct</h4>
        <p>{question}</p>
        <div className={styles.popupActions}>
          {type === 'clarifying' &&
            <>
              <MainButton btnStyles={
                {width: '32%', borderRadius: '4px', backgroundColor: 'var(--primary-turquoise)', marginRight: '12px', color: '#000'}
                } onCustomClick={() => userChoice(false)}>No</MainButton>
              <MainButton btnStyles={
                {width: '32%', borderRadius: '4px', backgroundColor: 'red', color: '#000'}
                } onCustomClick={() => userChoice(true)}>Yes</MainButton>
            </>
          }
          {type === 'confirmation' &&
            <>
              <MainButton btnStyles={
                {width: '32%', borderRadius: '4px', backgroundColor: 'var(--primary-turquoise)', marginRight: '12px', color: '#000'}
                } onCustomClick={() => userChoice()}>Confirm</MainButton>
            </>
          }
        </div>
      </section>
    </div>
  )
}

export default Popup;