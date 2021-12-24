import React, { useContext } from "react";
import styles from './UserProfile.module.scss';
import { useEffect, useState } from "react/cjs/react.development";
import axios from 'axios';
import Logout from '../Logout/Logout';
import { UsersContextProvider, UsersContext } from "../../utils/UsersContext";

const UserProfile = () => {

  const [userInfo, setUserInfo] = useState(null);
  const {usersDB} = useContext(UsersContext);
  const [imgPlaceholder, setImgPlaceholder] = useState(null);

  useState(() => {
    const id = sessionStorage.getItem('userId');

    if (id.length > 3) {
      const foundUser = usersDB.find(user => user.id === Number(id));
      setUserInfo(foundUser);
      return
    }

    const userIdentifier = sessionStorage.getItem('userId');
    axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users/${userIdentifier}`)
    .then(response => setUserInfo(response.data.data))
  }, []);

  useEffect(() => {
    if (!userInfo.avatar) {
      setImgPlaceholder(userInfo.first_name)
    }
  }, [userInfo])

  return (
    <div className={styles["user-profile"]}>
      {userInfo?.avatar &&
        <img className={styles["user-profile__image"]} src={userInfo?.avatar} alt="me"></img>
      }
      {!userInfo?.avatar &&
        <div className={styles["image-placeholder"]}>
          <span className={styles["image-placeholder__text"]}>{imgPlaceholder}</span>
        </div>
      }
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