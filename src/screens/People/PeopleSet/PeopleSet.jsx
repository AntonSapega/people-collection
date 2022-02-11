import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './PeopleSet.module.scss';
import PersonCard from '../PersonCard/PersonCard';
import { useSelector } from "react-redux";
import { ROUTES } from "../../../enums/ROUTES";

const PeopleSet = () => {
  const navigate = useNavigate();
  const peopleCollection = useSelector(state => state.peopleCollection.people);
  const peopleFromServer = useSelector(state => state.peoplePage.people);

  function openPersonDetailsPage(id) {
    navigate(`/${ROUTES.person}/${id}`);
  }

  return (
    <>
      {
        peopleFromServer.map(user => {
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

export default PeopleSet;