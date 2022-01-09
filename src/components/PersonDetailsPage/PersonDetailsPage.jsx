import React, { useContext, useState } from 'react';
import styles from './PersonDetailsPage.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios';
import { UsersContext } from "../../utils/UsersContext";

const PersonDetailsPage = () => {

  const [personInfo, setPersonInfo] = useState();
  const [favoriteColor, setFavoriteColor] = useState();

  const routeParams = useParams();
  const navigate = useNavigate();

  const { usersDB, deleteUserFromDB } = useContext(UsersContext);
  
  useEffect(() => {
    Promise.all([getPersonInfo(), getPersonFavoriteColor()])
    .then(response => {
      setPersonInfo(response[0].data.data)
      setFavoriteColor(response[1].data.data)
    })
    .catch(error => console.log(error.message))
  }, [])

  function getPersonInfo() {
    return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users/${routeParams.id}`)
  }

  function getPersonFavoriteColor() {
    return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/unknown/${routeParams.id}`)
  }

  function goToPrevPage() {
    navigate(-1);
  }

  function deleteActivePerson() {
    axios.delete(`${process.env.REACT_APP_REQ_RES_URL}api/users/${routeParams.id}`)
    .then(response => {
      if (response.status === 204) {
        deleteUserFromDB(personInfo);
        goToPrevPage();
      }
    })
  }

  function goToColorPage() {
    navigate(`/colors/color-details/${routeParams.id}`)
  }

  const avatarPlaceholder = `${personInfo?.first_name} ${personInfo?.last_name}`;
  const emailIcon = `${styles['email__icon']} material-icons`;
  const goBackStyle = `${styles['go-back__arrow']} material-icons`;
  const deleteStyle = `${styles['delete-person']} material-icons`

  return (
    <>
      <div className={styles['go-back']} onClick={goToPrevPage}>
        <span className={goBackStyle}>arrow_back</span>
      </div>

      <div className={styles['person-details']}>
        {personInfo && favoriteColor &&
          <>
            <div className={styles['person-details__main-info']}>
              <img className={styles['person-details__img']} src={personInfo.avatar} alt={avatarPlaceholder} />
              <article className={styles['person-details__necessary-info']}>
                <h1 className={styles['person-details__full-name']}>{personInfo.first_name} {personInfo.last_name}</h1>
                <section className={styles['email']}>
                  <span className={emailIcon}>email</span>
                  <h5 className={styles['email__path']}>{personInfo.email}</h5>
                </section>
              </article>
              <span className={deleteStyle} onClick={deleteActivePerson}>highlight_off</span>
            </div>
            <div>
              <article className={styles['favorite-color']}>
                <h3>My favorite color: <span className={styles['favorite-color__name']}>{favoriteColor.name}</span></h3>
                <span>Color code: <span className={styles['favorite-color__code']}>{favoriteColor.color}</span></span>
                <span>Foundation date: <span className={styles['favorite-color__date']}>{favoriteColor.year} year</span></span>
                <div className={styles['favorite-color__sample-wrapper']}>
                  <span>Sample: </span>
                  <span className={styles['favorite-color__sample']} style={{backgroundColor: favoriteColor.color}} onClick={goToColorPage}></span>
                </div>
              </article>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default PersonDetailsPage;