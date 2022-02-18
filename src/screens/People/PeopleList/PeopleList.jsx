import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import styles from './PeopleList.module.scss';
import PersonCard from '../PersonCard/PersonCard';
import { useSelector } from "react-redux";
import { ROUTES } from "../../../enums/ROUTES";
import { sessionController } from "../../../services/storage/sessionController";
import { useDispatch } from "react-redux";
import { getPeopleMiddleware, getParticularPeople } from '../../../store/peoplePage/actions';

const PeopleList = () => {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [people, setPeople] = useState([]);
  const peopleCollection = useSelector(state => state.peopleCollection.people);
  const peopleFromServer = useSelector(state => state.peoplePage.people);
  const totalPages = useSelector(state => state.peoplePage.pagesAmount);
  const dispatch = useDispatch();

  const [inputValue] = useOutletContext();

  useEffect(() => {
    dispatch(getPeopleMiddleware(routeParams.page));
  }, [routeParams]);

  useEffect(() => {
    const filteredArray = filterByDeletedPeople();
    setPeople(filteredArray);
    filterByUser();
  }, [peopleFromServer]);

  useEffect(() => {
    // if(inputValue.length > 1) {
    //   const matched = peopleCollection.filter(person => {
    //     const fullName = `${person.first_name.toLowerCase()} ${person.last_name.toLowerCase()}`;
    //     return fullName.includes(inputValue.toLowerCase());
    //   })
    //   setPeople(matched);
    // } else {
    //   setPeople(filterByDeletedPeople());
    //   filterByUser();
    // }

    if(inputValue.length > 1) {
      const matchedPeople = peopleCollection.filter(person => {
        const fullName = `${person.first_name.toLowerCase()} ${person.last_name.toLowerCase()}`;
        return fullName.includes(inputValue.toLowerCase());
      })
      const peopleIds = matchedPeople.map(person => person.id);
      // console.log(peopleIds)
      dispatch(getParticularPeople(peopleIds));
    } else dispatch(getPeopleMiddleware(routeParams.page))
  }, [inputValue]);

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