import React, { useContext } from "react";
import styles from './UserProfile.module.scss';
import { useEffect, useState } from "react/cjs/react.development";
import axios from 'axios';
import Logout from '../Logout/Logout';
import { UsersContext } from "../../utils/UsersContext";
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';

const UserProfile = () => {

  const [userInfo, setUserInfo] = useState(null);
  const {usersDB} = useContext(UsersContext);

  useEffect(() => {
    const id = sessionStorage.getItem('userId');

    if (sessionStorage.getItem('createdUser')) {
      const foundUser = usersDB.find(user => user.id === Number(id));
      setUserInfo(foundUser);
      return;
    }

    const userIdentifier = sessionStorage.getItem('userId');
    axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users/${userIdentifier}`)
    .then(response => setUserInfo(response.data.data))
  }, [usersDB]);

  return (
    <div className={styles["user-profile"]}>
      {userInfo?.avatar &&
        <img className={styles["user-profile__image"]} src={userInfo?.avatar} alt="me"></img>
      }
      {userInfo && !userInfo?.avatar &&
        <ImagePlaceholder firstWord={userInfo.first_name} secondWord={userInfo.last_name} />
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