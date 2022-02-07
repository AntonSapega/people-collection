import React from "react";
import styles from './Logout.module.scss';
import MainButton from '../MainButton/MainButton';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from '../../store/user/actions';
import { clearPeopleCollection, deletePerson } from '../../store/peopleDB/actions';

const Logout = () => {
  const user = useSelector(state => state.user.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(removeUser())
    dispatch(deletePerson(user.id));
    dispatch(clearPeopleCollection());
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