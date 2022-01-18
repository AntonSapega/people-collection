import React from "react";
import styles from './UserProfile.module.scss';
import { useEffect, useState } from "react/cjs/react.development";
import Logout from '../Logout/Logout';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import { useSelector } from "react-redux";

const UserProfile = () => {

  const [userInfo, setUserInfo] = useState(null);
  const user = useSelector(state => state.user.info);
  const peopleCollection = useSelector(state => state.peopleCollection.people);

  useEffect(() => {
    if (user && peopleCollection.length) {
      const foundUser = peopleCollection.find(person => person.id === user.id);
      if (foundUser) {
        setUserInfo(foundUser);
      }
    }
  }, [user, peopleCollection]);

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