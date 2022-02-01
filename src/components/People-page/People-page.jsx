import React, { useState, useEffect } from "react";
import styles from './People-page.module.scss';
import PersonCard from "../Person-card/PersonCard";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Pagination/Pagination';
import { useSelector } from "react-redux";

const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  const navigate = useNavigate();
  const routeParams = useParams();
  const peopleCollection = useSelector(state => state.peopleCollection.people);
  const peopleForPage = useSelector(state => state.peoplePage.people);
  const totalPages = useSelector(state => state.peoplePage.pagesAmount);

  useEffect(() => {
    const filteredArray = filterByDeletedPeople(peopleForPage);
    setPeople(filteredArray);
    filterByUser();
  }, [peopleForPage]);

  function filterByDeletedPeople(array) {
    return peopleCollection.filter(personFromDB => {
      return array.find(personFromServer => personFromServer.id === personFromDB.id);
    })
  }

  function filterByUser() {
    if (Number(totalPages) === Number(routeParams.page)) {
      const userFromStorage = JSON.parse(sessionStorage.getItem('user'));

      const isUserExistInPeopleCollection = peopleCollection.find(person => person.id === userFromStorage.id);
      if (!isUserExistInPeopleCollection) {
        setPeople(people => people.concat([userFromStorage]));
      }
    }
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

  const renderUsers = people.map(user => {
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