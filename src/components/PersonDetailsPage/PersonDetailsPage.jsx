import React, { useState } from 'react';
import styles from './PersonDetailsPage.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deletePerson, getPersonDetails } from '../../redux/actions';
import { useSelector } from 'react-redux';
import DeletedStamp from '../DeletedStamp/DeletedStamp';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';

const PersonDetailsPage = () => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDeleted, setIsDeleted] = useState(false);
  const mainUser = useSelector(state => state.user.info);
  const peopleCollection = useSelector(state => state.peopleCollection.people);
  const personInfo = useSelector(state => state.personDetails.mainInfo);
  const favoriteColor = useSelector(state => state.personDetails.favoriteColor);

  useEffect(() => {
      if (personInfo) {
        checkPersonOnExist();
      }
  }, [personInfo])

  useEffect(() => {
    return () => {
      dispatch(getPersonDetails({
        mainInfo: null,
        favoriteColor: null}))
    }
  }, [])



  function checkPersonOnExist() {
    const wasPersonDeleted = peopleCollection?.find(human => human.id === personInfo.id);
    if (!wasPersonDeleted && personInfo.id !== mainUser.id) {
      setIsDeleted(true);
    }
  }

  function goToPrevPage() {
    navigate(-1);
  }

  function deleteActivePerson() {
    axios.delete(`${process.env.REACT_APP_REQ_RES_URL}api/users/${routeParams.id}`)
    .then(response => {
      if (response.status === 204) {
        dispatch(deletePerson(personInfo.id))
        goToPrevPage();
      }
    }).catch(error => {
      console.log('error', error)
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
              {personInfo.avatar && <img className={styles['person-details__img']} src={personInfo.avatar} alt={avatarPlaceholder} />}
              {!personInfo.avatar &&
                <ImagePlaceholder
                  firstWord={personInfo.first_name}
                  secondWord={personInfo.last_name}
                  imgStyles={{height: '150px', width: '150px', fontSize: '2.6rem'}} />}
              <article className={styles['person-details__necessary-info']}>
                <h1 className={styles['person-details__full-name']}>{personInfo.first_name} {personInfo.last_name}</h1>
                <section className={styles['email']}>
                  <span className={emailIcon}>email</span>
                  <h5 className={styles['email__path']}>{personInfo.email}</h5>
                </section>
              </article>
              {!isDeleted && <span className={deleteStyle} onClick={deleteActivePerson}>highlight_off</span>}
              {isDeleted && <DeletedStamp positionStyles={{position: 'absolute', bottom: '62px', right: '78px'}} />}
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