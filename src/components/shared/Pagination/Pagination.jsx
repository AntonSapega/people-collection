import React from 'react';
import styles from './Pagination.module.scss';
import NavBtn from './NavBtn/NavBtn';

const Pagination = ({activePage, totalPages, onBtnNumber, onIncreasePage, onDecreasePageNumber}) => {
  const buttons = [];

  for (let i = 1; i <= totalPages; i++) {
    buttons.push(i);
  }

  function handleNextBtnClick() {
    if (activePage >= totalPages) {
      return;
    }
    onIncreasePage();
  }

  function handlePrevBtnClick() {
    if (activePage > 1) {
      onDecreasePageNumber();
    }
  }
  
  return (
    <nav className={styles.pagination}>
      <NavBtn handleClick={handlePrevBtnClick} isDisable={Number(activePage) === 1}>
        <span className='material-icons'>chevron_left</span>
        <span className={styles['pagination__btn-title']}>previous</span>
      </NavBtn>

      {buttons.map(btn => {
        return (
          <div className={styles.btn} key={btn}>
            <NavBtn handleClick={() => onBtnNumber(btn)} active={Number(activePage) === btn}>{btn}</NavBtn>
          </div>
        )
      })}

      <div className={styles.btn}>
        <NavBtn handleClick={handleNextBtnClick} isDisable={Number(activePage) === Number(totalPages)}>
          <span className={styles['pagination__btn-title']}>next</span>
          <span className='material-icons'>navigate_next</span>
        </NavBtn>
      </div>
    </nav>
  )
}

export default Pagination;