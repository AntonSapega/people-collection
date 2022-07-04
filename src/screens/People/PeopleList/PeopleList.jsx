import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './PeopleList.module.scss';
import PersonCard from '../PersonCard/PersonCard';
import { useSelector } from "react-redux";
import { ROUTES } from "../../../enums/ROUTES";
import { sessionController } from "../../../services/storage/sessionController";

const PeopleList = () => {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [people, setPeople] = useState([]);
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
      const userFromStorage = sessionController.getUser();

      const isUserExistInPeopleCollection = peopleCollection.find(person => person.id === userFromStorage.id);
      if (!isUserExistInPeopleCollection) {
        setPeople(people => people.concat([userFromStorage]));
      }
    }
  }

  function openPersonDetailsPage(id) {
    navigate(`/${ROUTES.person}/${id}`);
  }

  return (
    <>
      {
        people.map(user => {
          return (
            <div className={styles.personWrapper} key={user.id.toString()}>
              <PersonCard user={user} onCardClick={openPersonDetailsPage} />
            </div>
          )
        })
      }
    </>
  )
}

export default PeopleList;