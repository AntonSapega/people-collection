import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import styles from './PeopleList.module.scss';
import PersonCard from '../PersonCard/PersonCard';
import { useSelector } from "react-redux";
import { ROUTES } from "../../../enums/ROUTES";
import { sessionController } from "../../../services/storage/sessionController";
import { useDispatch } from "react-redux";
import { getPeopleMiddleware, getParticularPeople } from '../../../store/peoplePage/reducers';
import useDebounce from '../../../hooks/useDebounce';
import NothingFound from "../../../components/shared/NothingFound/NothingFound";

const PeopleList = () => {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [people, setPeople] = useState([]);
  const peopleCollection = useSelector(state => state.peopleCollection.people);
  const peopleFromServer = useSelector(state => state.peoplePage.people);
  const totalPages = useSelector(state => state.peoplePage.pagesAmount);
  const dispatch = useDispatch();

  const [inputValue] = useOutletContext();
  const debouncedSearchTerm = useDebounce(inputValue, 600);

  useEffect(() => {
    if(debouncedSearchTerm) {
      const matchedPeople = peopleCollection.filter(person => {
        const fullName = `${person.first_name.toLowerCase()} ${person.last_name.toLowerCase()}`;
        return fullName.includes(inputValue.toLowerCase());
      })
      const peopleIds = matchedPeople.map(person => person.id);
      dispatch(getParticularPeople(peopleIds));
    } else {
      console.log('else')
      dispatch(getPeopleMiddleware(routeParams.page));
    }
  }, [routeParams, debouncedSearchTerm]);

  useEffect(() => {
    const filteredArray = filterByDeletedPeople();
    setPeople(filteredArray);
    filterByUser();
  }, [peopleFromServer]);

  useEffect(() => {
    // if(debouncedSearchTerm) {
    //   const matchedPeople = peopleCollection.filter(person => {
    //     const fullName = `${person.first_name.toLowerCase()} ${person.last_name.toLowerCase()}`;
    //     return fullName.includes(inputValue.toLowerCase());
    //   })
    //   const peopleIds = matchedPeople.map(person => person.id);
    //   dispatch(getParticularPeople(peopleIds));
    // } else {
    //   console.log('else')
    //   dispatch(getPeopleMiddleware(routeParams.page));
    // }
  }, [debouncedSearchTerm]);

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
      {people.length === 0 &&
        <div className={styles.empty_page}>
          <NothingFound />
        </div>
      }
    </>
  )
}

export default PeopleList;