import React, { useState, useEffect } from "react";
import styles from './People-page.module.scss';
import PersonCard from "../../../components/Person-card/PersonCard";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../../../components/Pagination/Pagination';
import { useSelector } from "react-redux";
import { ROUTES } from "../../../enums/ROUTES";

const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  const navigate = useNavigate();
  const routeParams = useParams();
  const peopleCollection = useSelector(state => state.peopleCollection.people);
  const peopleFromServer = useSelector(state => state.peoplePage.people);
  const totalPages = useSelector(state => state.peoplePage.pagesAmount);

  useEffect(() => {
    const filteredArray = filterByDeletedPeople();
    setPeople(filteredArray);
    filterByUser();
  }, [peopleFromServer]);

  function filterByDeletedPeople() {
    return peopleCollection.filter(personFromDB => {
      return peopleFromServer.find(personFromServer => personFromServer.id === personFromDB.id);
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
    navigate(`${ROUTES.people}/${nextPage}`, {replace: false});
  }

  function decreasePageNumber() {
    const prevPage = Number(routeParams.page) - 1;
    navigate(`${ROUTES.people}/${prevPage}`, {replace: false});
  }

  function handleChosenPage(num) {
    navigate(`${ROUTES.people}/${num}`, {replace: false});
  }

  function openPersonDetailsPage(id) {
    navigate(`${ROUTES.person}/${id}`);
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