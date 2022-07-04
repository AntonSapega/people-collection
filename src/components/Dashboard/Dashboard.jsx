import React from "react";
import styles from './Dashboard.module.scss';
import Logout from './Logout/Logout';
import ImagePlaceholder from '../shared/ImagePlaceholder/ImagePlaceholder';
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector(state => state.user.info);

  return (
    <div className={styles["user-profile"]}>
      {user?.avatar &&
        <img className={styles["user-profile__image"]} src={user?.avatar} alt="me"></img>
      }
      {user && !user?.avatar &&
        <ImagePlaceholder firstWord={user.first_name} secondWord={user.last_name} />
      }
      <div className={styles["user-profile__description"]}>
        <span className={styles["user-profile__full-name"]}>{user?.first_name} {user?.last_name}</span>
        <span className={styles["user-profile__email"]}>{user?.email}</span>
      </div>

      <div className={styles["user-profile__logout-container"]}>
        <Logout />
      </div>
    </div>
  )
}

export default Dashboard;