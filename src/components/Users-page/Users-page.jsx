import React, { useState, useEffect, useRef } from "react";
import styles from './Users-page.module.scss';
import axios from "axios";
import PersonCard from "../Person-card/PersonCard";
import { useNavigate, useParams } from "react-router-dom";

const UsersPage = () => {

  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Component did mount')
    if (pageNumber === 1) {
      navigate(`/users/${pageNumber}`, {replace: false});
    }

    const request = async () => {
      await getUsersPage(pageNumber);
      // await getUsersPage(2);
    }

    request();
  }, [])

  // useRef(() => {
  //   getUsersPage(pageNumber)
  // }, [pageNumber])

  const getUsersPage = (number) => {
    return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users?page=${number}`).then(response => {
      setUsers(state => {
        return [...state, ...response.data.data];
      })
    })
  }

  function nextPage() {
    console.log(pageNumber)
    setPageNumber(state => state + 1)
    console.log(pageNumber)
    navigate(`/users/${pageNumber}`, {replace: false});
  }

  const renderUsers = users.map(user => {
    return (
      <div className={styles['users-page__user']} key={user.id.toString()}>
        <PersonCard user={user} />
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

      <nav className={styles['users-page__pagination']}>
        <button>previous</button>
        <button>1</button>
        <button onClick={nextPage}>next</button>
      </nav>
    </div>
  )
}

export default UsersPage;