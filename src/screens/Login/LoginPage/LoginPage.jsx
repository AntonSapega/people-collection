import React, { useEffect, useState } from 'react';
import LoginForm from '../Login-form/Login-form';
import styles from './LoginPage.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, authUser, resetUserWasNotFoundField } from '../../../store/user/actions';
import Popup from '../../../components/Popup/Popup';

const LoginPage = () => {
  const [formTitle] = useState('People Collection');
  const [formDescription] = useState("Try to find someone you really want to find");

  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(state => state.user.info);
  const userNotFound = useSelector(state => state.user.userNotFound)
  const dispatch = useDispatch();

  const [isPopupVisible, setPopupStatus] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(location.state.from.pathname, {replace: true});
    }
  }, [user])

  useEffect(() => {
    if (userNotFound) {
      setPopupStatus(true);
    }
  }, [userNotFound])

  function handleForm(formValue) {
    if (formValue.confirmPassword) {
      dispatch(createUser(formValue));
      return;
    }
    dispatch(authUser(formValue));
  }

  function handleConfirmation() {
    dispatch(resetUserWasNotFoundField())
    setPopupStatus(false)
  }

  return (
    <>
      <div className={styles['login-form']}>
        <aside className={styles['login-form__left-side']}></aside>
        <LoginForm
          title={formTitle}
          description={formDescription}
          onGetForm={event => handleForm(event)}
        />
      </div>
      {isPopupVisible &&
        <Popup
          type={'confirmation'}
          question={`User was not found`}
          userChoice={() => handleConfirmation()}
        />
      }
    </>
  )
}

export default LoginPage;