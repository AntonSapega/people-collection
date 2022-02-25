import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styles from './ColorDetails.module.scss';
import { loadColorDetailsMiddleware } from '../../store/colorDetailsPage/reducers';
import { useSelector } from "react-redux";
import { ROUTES } from "../../enums/ROUTES";
import { useRef } from "react";
import BackByHistory from '../../components/shared/BackByHistory/BackByHistory';
import useTip from "../../hooks/useTip";

const ColorDetails = () => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const colorInfo = useSelector(state => state.colorDetailsPage.color);
  const creator = useSelector(state => state.colorDetailsPage.creator);
  const textPlaceholder = useSelector(state => state.colorDetailsPage.description);

  const ref = useRef();
  useTip(ref, `${creator?.first_name} ${creator?.last_name}`, 150, document.getElementsByTagName('main')[0]);

  useEffect(() => {
    dispatch(loadColorDetailsMiddleware(routeParams.id));
  }, []);

  function goToCreator() {
    navigate(`/${ROUTES.person}/${routeParams.id}`);
  }

  return (
    <article className={styles['color-details']}>
      {colorInfo && creator && textPlaceholder &&
        <>
          <div className={styles['color-details__history-nav']}>
            <BackByHistory />
          </div>

          <h1 className={styles['color-details__title']}>{colorInfo.name}</h1>
          <div ref={ref} className={styles['color-details__sample']} style={{backgroundColor: colorInfo.color}}></div>

          <div className={styles['color-details__full-info']}>
            <section className={styles['color-details__main-info']}>
              <h4>Color Name: <span className={styles['color-details__details']}>{colorInfo.name}</span></h4>
              <span style={{marginBottom: '0.766rem'}}>Sample:
                <span style={{backgroundColor: colorInfo.color}} className={styles['color-details__color-sample']}></span>
              </span>
              <span>Code: <span className={styles['color-details__details']}>{colorInfo.color}</span></span>
              <span>Year: <span className={styles['color-details__details']}>{colorInfo.year}</span></span>
              <span>Created By:</span>
              <figure ref={ref} className={styles['color-details__creator']} onClick={goToCreator}>
                <img  className={styles['color-details__creator-avatar']} src={creator.avatar} alt="creator" />
                <figcaption  className={styles['color-details__creator-full-name']}>{creator.first_name} {creator.last_name}</figcaption>
              </figure>
            </section>

            <section className={styles['text-placeholder']}>
              <h2  className={styles['text-placeholder__title']}>{textPlaceholder.title}</h2>
              <p  className={styles['text-placeholder__text']}>{textPlaceholder.body}</p>
            </section>
          </div>
        </>
      }
    </article>
  )
}

export default ColorDetails;