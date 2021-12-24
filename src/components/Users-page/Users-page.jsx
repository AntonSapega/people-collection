import React, { useState, useEffect } from "react";
import styles from './Users-page.module.scss';
import axios from "axios";
import PersonCard from "../Person-card/PersonCard";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Pagination from '../Pagination/Pagination';

const UsersPage = () => {

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const routeParams = useParams();

  useEffect(() => {
    getUsersPage(routeParams.page)
  }, [routeParams])

  useEffect(() => {
  }, [location])



  const getUsersPage = (number) => {
    return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users?page=${number}`).then(response => {
      setUsers(() => {
        setTotalPages(() => response.data.total_pages)
        return [...response.data.data];
      })
    })
  }

  function increasePageNumber() {
    const nextPage = Number(routeParams.page) + 1;
    navigate(`/users/${nextPage}`, {replace: false});
  }

  function decreasePageNumber() {
    const prevPage = Number(routeParams.page) - 1;
    navigate(`/users/${prevPage}`, {replace: false});
  }

  function handleChosenPage(num) {
    navigate(`/users/${num}`, {replace: false});
  }

  function openPersonDetailsPage(id) {
    navigate(`/users/user/${id}`)
  }

  const renderUsers = users.map(user => {
    return (
      <div className={styles['users-page__user']} key={user.id.toString()}>
        <PersonCard user={user} onCardClick={openPersonDetailsPage} />
      </div>
    )
  })

  return (
    <div className={styles['users-page']}>
      <h1 className={styles['users-page__title']}>Users</h1>
      <span className={styles['users-page__description']}>List of users</span>

      <div className={styles['users-page__users']}>
        {renderUsers}
        {/* {<ListPersonCards />} */}
      </div>
      <div className={styles['users-page__pagination-wrapper']}>
        <Pagination
          activePage={routeParams.page}
          totalPages={totalPages}
          onBtnNumber={handleChosenPage}
          onIncreasePage={increasePageNumber}
          onDecreasePageNumber={decreasePageNumber}
        />
      </div>
    </div>
  )
}

export default UsersPage;