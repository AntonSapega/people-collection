import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackByHistory.module.scss';

const BackByHistory = () => {
  const navigate = useNavigate();
  function goToPrevPage() {
    navigate(-1);
  }

  const goBackStyle = `${styles.back__arrow} material-icons`;

  return (
    <div className={styles.back} onClick={goToPrevPage}>
      <span className={goBackStyle}>arrow_back</span>
    </div>
  )
}

export default BackByHistory;