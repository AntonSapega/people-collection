import React, { useState, useEffect } from "react";
import styles from './People.module.scss';
import PersonCard from "./PersonCard/PersonCard";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Pagination from '../../components/shared/Pagination/Pagination';
import { useSelector } from "react-redux";
import { ROUTES } from "../../enums/ROUTES";
import { sessionController } from "../../services/storage/sessionController";

const People = () => {
  const [people, setPeople] = useState([]);

  const navigate = useNavigate();
  const routeParams = useParams();
  const peopleCollection = useSelector(state => state.peopleCollection.people);
  const peopleFromServer = useSelector(state => state.peoplePage.people);
  const totalPages = useSelector(state => state.peoplePage.pagesAmount);

  useEffect(() => {
    if (!routeParams.page) {
      navigate('1');
    }
  }, [routeParams])

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
      const userFromStorage = sessionController.getUser();

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




  function goToNextPage() {
    const nextPage = Number(routeParams.page) + 1;
    navigate(`${nextPage}`, {replace: false});
  }

  function goToPrevPage() {
    const prevPage = Number(routeParams.page) - 1;
    navigate(`${prevPage}`, {replace: false});
  }

  function goToChosenPage(num) {
    navigate(`${num}`, {replace: false});
  }








  // const renderUsers = people.map(user => {
  //   return (
  //     <div className={styles['users-page__user']} key={user.id.toString()}>
  //       <PersonCard user={user} onCardClick={openPersonDetailsPage} />
  //     </div>
  //   )
  // })

  return (
    <div className={styles['users-page']}>
      <h1 className={styles['users-page__title']}>People</h1>
      <span className={styles['users-page__description']}>List of people</span>

      <div className={styles['users-page__users']}>
        <Outlet />
        {/* {<ListPersonCards />} */}
      </div>
      <div className={styles['users-page__pagination-wrapper']}>
        <Pagination
          activePage={routeParams.page}
          totalPages={totalPages}
          onBtnNumber={goToChosenPage}
          onIncreasePage={goToNextPage}
          onDecreasePageNumber={goToPrevPage}
        />
      </div>
    </div>
  )
}

export default People;