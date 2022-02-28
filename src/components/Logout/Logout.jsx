import React from "react";
import styles from './Logout.module.scss';
import MainButton from '../MainButton/MainButton';
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('createdUser');
    navigate('/', {replace: true});
  }

  return (
    <div className={styles["logout"]}>
      <div className={styles['logout__template']}>
        <span className={styles['logout__question']}>Do you want log out?</span>
        <MainButton btnStyles={{width: '100%', borderRadius: '4px'}} onCustomClick={handleLogoutClick}>Logout</MainButton>
      </div>
    </div>
  )
}

export default Logout;