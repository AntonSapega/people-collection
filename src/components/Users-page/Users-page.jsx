import React, { useState, useEffect } from "react";
import styles from './Users-page.module.scss';
import axios from "axios";

const UsersPage = () => {

  const [users, setUsers] = useState([]);
  // const [pageCounter, setPageCounter] = useState(1);

  useEffect(() => {
    const request = async () => {
      await getUsersPage(1);
      await getUsersPage(2);
    }

    request();
  }, [])

  const getUsersPage = (number) => {
    return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users?page=${number}`).then(response => {
      setUsers(state => {
        return [...state, ...response.data.data];
      })
    })
  }

  const renderUsers = users.map(user => {
    return (
      <div className={styles['person-id-card']} key={user.id?.toString()}>
        <img className={styles['person-id-card__img']} src={user.avatar} alt="person image" />
        {user.first_name} {user.last_name}
      </div>
    )
  })

  return (
    <div className={styles['users-page']}>
      <h1 className={styles['users-page__title']}>Users</h1>
      <span className={styles['users-page__description']}>List of users</span>

      <div className={styles['users-page__users']}>
        {renderUsers}
      </div>
    </div>
  )
}

export default UsersPage;