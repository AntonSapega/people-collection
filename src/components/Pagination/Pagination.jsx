import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({activePage, totalPages, onBtnNumber, onIncreasePage, onDecreasePageNumber}) => {
  const buttons = [];
  for (let i = 1; i <= totalPages; i++) {
    const btnStyle = [styles['pagination__btn']];
    if (Number(activePage) === i) {
      btnStyle.push(styles['pagination__btn_active'])
    }
    buttons.push(<button className={btnStyle.join(' ')} onClick={() => onBtnNumber(i)} key={i}>{i}</button>)
  }
  const btnImageStyle = [`material-icons ${styles['pagination__btn-img']}`]

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
    <nav className={styles['pagination']}>
      <button className={styles['pagination__btn']} onClick={handlePrevBtnClick} disabled={Number(activePage) === 1}>
        <span className={btnImageStyle}>chevron_left</span>
        <span className={styles['pagination__btn-title']}>previous</span>
      </button>

      {buttons.map(btn => btn)}

      <button className={styles['pagination__btn']} onClick={handleNextBtnClick} disabled={Number(activePage) === Number(totalPages)}>
        <span className={styles['pagination__btn-title']}>next</span>
        <span className={btnImageStyle}>navigate_next</span>
      </button>
    </nav>
  )
}

export default Pagination;