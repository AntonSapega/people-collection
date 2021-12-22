import React from "react";
import styles from './UserProfile.module.scss';
import { useState } from "react/cjs/react.development";
import axios from 'axios';
import Logout from '../Logout/Logout';

const UserProfile = ( {userId} ) => {

  const [userInfo, setUserInfo] = useState(null);

  useState(() => {
    console.log('userIdentifier: ', userId);
    const userIdentifier = sessionStorage.getItem('userId');
    axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users/${userIdentifier}`)
    .then(response => setUserInfo(response.data.data))
  }, []);

  return (
    <div className={styles["user-profile"]}>
      <img className={styles["user-profile__image"]} src={userInfo?.avatar} alt="me"></img>
      <div className={styles["user-profile__description"]}>
        <span className={styles["user-profile__full-name"]}>{userInfo?.first_name} {userInfo?.last_name}</span>
        <span className={styles["user-profile__email"]}>{userInfo?.email}</span>
      </div>

      <div className={styles["user-profile__logout-container"]}>
        <Logout />
      </div>
    </div>
  )
}

export default UserProfile;