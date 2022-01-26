import React, { useState, useEffect } from "react";
import styles from './People-page.module.scss';
import axios from "axios";
import PersonCard from "../Person-card/PersonCard";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Pagination/Pagination';
import { useSelector } from "react-redux";

const PeoplePage = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  const navigate = useNavigate();
  const routeParams = useParams();
  const mainUser = useSelector(state => state.user.info);
  const peopleCollection = useSelector(state => state.peopleCollection.people);

  useEffect(() => {
    if (mainUser) {
      getUsersPage(routeParams.page);
    }
  }, [routeParams, mainUser])

  const getUsersPage = (number) => {
    console.log('routeParams:', routeParams);
    axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users?page=${number}`).then(response => {
      setUsers(() => {
        setTotalPages(() => response.data.total_pages);
        const filteredByDeletedPeople = filterByDeletedPeople(response.data.data);
        return filterByUser(filteredByDeletedPeople, response.data.page, response.data.total_pages);
      })
    })
  }

  function filterByDeletedPeople(array) {
    return peopleCollection.filter(personFromDB => {
      return array.find(personFromServer => personFromServer.id === personFromDB.id);
    })
  }

  function filterByUser(people, page, totalPages) {
    const userIsExistInPeopleState = peopleCollection.find(person => person.id === mainUser.id)
    if (totalPages === page && !userIsExistInPeopleState) {
      return people.concat([mainUser]);
    }
    return people
  }

  function increasePageNumber() {
    const nextPage = Number(routeParams.page) + 1;
    navigate(`/people/${nextPage}`, {replace: false});
  }

  function decreasePageNumber() {
    const prevPage = Number(routeParams.page) - 1;
    navigate(`/people/${prevPage}`, {replace: false});
  }

  function handleChosenPage(num) {
    navigate(`/people/${num}`, {replace: false});
  }

  function openPersonDetailsPage(id) {
    navigate(`/people/person/${id}`)
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
      <h1 className={styles['users-page__title']}>People</h1>
      <span className={styles['users-page__description']}>List of people</span>

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

export default PeoplePage;