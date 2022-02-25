import React, { useState, useRef } from 'react';
import styles from './PersonDetails.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { useDispatch } from 'react-redux';
import { getPersonDetails } from '../../store/personDetailsPage/reducers';
import { deletePersonMiddleware } from '../../store/peopleDB/reducers';
import { useSelector } from 'react-redux';
import DeletedStamp from '../../components/shared/DeletedStamp/DeletedStamp';
import ImagePlaceholder from '../../components/shared/ImagePlaceholder/ImagePlaceholder';
import { ROUTES } from '../../enums/ROUTES';
import Modal from '../../components/Modal/Modal';
import useTip from '../../hooks/useTip';
import BackByHistory from '../../components/shared/BackByHistory/BackByHistory';

const PersonDetailsPage = () => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDeleted, setIsDeleted] = useState(false);
  const mainUser = useSelector(state => state.user.info);
  const peopleCollection = useSelector(state => state.peopleCollection.people);
  const personInfo = useSelector(state => state.personDetails.mainInfo);
  const favoriteColor = useSelector(state => state.personDetails.favoriteColor);
  const [isPopupVisible, setPopupStatus] = useState(false)

  const ref = useRef();
  useTip(ref, 'See details', 40);

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

  useEffect(() => {
    if (personInfo) {
      const isStillExistInCollection = !!peopleCollection.find(person => person.id === personInfo.id);
      if (!isStillExistInCollection) {
        goToPrevPage();
      }
    }
  }, [peopleCollection])



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
    setPopupStatus(true);
  }

  function handlePopupAction(actionResult) {
    if (actionResult) {
      dispatch(deletePersonMiddleware(personInfo.id));
      return;
    }
    setPopupStatus(false);
  }

  function goToColorPage() {
    navigate(`/${ROUTES.color}/${routeParams.id}`);
  }

  const avatarPlaceholder = `${personInfo?.first_name} ${personInfo?.last_name}`;
  const emailIcon = `${styles['email__icon']} material-icons`;
  const deleteStyle = `${styles['delete-person']} material-icons`

  return (
    <>
      <BackByHistory />
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
                  <span ref={ref} className={styles['favorite-color__sample']} style={{backgroundColor: favoriteColor.color}} onClick={goToColorPage}></span>
                </div>
              </article>
            </div>
          </>
        }
      </div>
      {isPopupVisible &&
        <Modal
          title="Please confirm your actions"
          type={"action"}
          userChoice={(result) => handlePopupAction(result)}>
          {`Are you sure you want to delete of ${personInfo.first_name} ${personInfo.last_name}?`}
        </Modal>
      }
    </>
  )
}

export default PersonDetailsPage;