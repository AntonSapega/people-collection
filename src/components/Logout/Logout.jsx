import React from "react";
import styles from './Logout.module.scss';
import MainButton from '../shared/MainButton/MainButton';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from '../../store/user/reducers';
import { clearPeopleCollection, deletePersonMiddleware } from '../../store/peopleDB/reducers';
import { ROUTES } from "../../enums/ROUTES";
import useLogout from "../../hooks/useLogout";

const Logout = () => {
  const user = useSelector(state => state.user.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useLogout();

  const handleLogoutClick = () => {
    dispatch(removeUser())
    dispatch(deletePersonMiddleware(user.id));
    dispatch(clearPeopleCollection());
    navigate(`${ROUTES.initial}`, {replace: true});
  }

  function exit() {
    logout()
  }

  return (
    <div className={styles["logout"]}>
      <div className={styles['logout__template']}>
        <span className={styles['logout__question']}>Do you want log out?</span>
        <MainButton colorStyle={'main_app'} btnStyles={{width: '100%', borderRadius: '4px', padding: '4px'}} onCustomClick={exit}>Logout</MainButton>
      </div>
    </div>
  )
}

export default Logout;