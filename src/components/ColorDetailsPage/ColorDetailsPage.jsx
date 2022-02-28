import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from './ColorDetailsPage.module.scss';

const ColorDetailsPage = () => {

  const [colorInfo, setColorInfo] = useState(null);
  const [creator, setCreator] = useState(null);
  const [textPlaceholder, setTextPlaceholder] = useState(null);

  const routeParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([fetchColorDetails(), fetchCreator(), fetchTextPlaceholder()])
    .then(response => {
      setColorInfo(response[0].data.data);
      setCreator(response[1].data.data);
      setTextPlaceholder(response[2].data);
    })
  }, [routeParams])

  function fetchColorDetails() {
    return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/unknown/${routeParams.id}`);
  }

  function fetchCreator() {
    return axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/users/${routeParams.id}`);
  }

  function fetchTextPlaceholder() {
    return axios.get(`${process.env.REACT_APP_JSON_PLACEHOLDER}posts/${routeParams.id}`);
  }

  function goToCreator() {
    navigate(`/people/person/${routeParams.id}`)
  }

  return (
    <article className={styles['color-details']}>
      {colorInfo && creator && textPlaceholder &&
        <>
          <h1 className={styles['color-details__title']}>{colorInfo.name}</h1>
          <div className={styles['color-details__sample']} style={{backgroundColor: colorInfo.color}}></div>

          <div className={styles['color-details__full-info']}>
            <section className={styles['color-details__main-info']}>
              <h4>Color Name: <span className={styles['color-details__details']}>{colorInfo.name}</span></h4>
              <span style={{marginBottom: '0.766rem'}}>Sample:
                <span style={{backgroundColor: colorInfo.color}} className={styles['color-details__color-sample']}></span>
              </span>
              <span>Code: <span className={styles['color-details__details']}>{colorInfo.color}</span></span>
              <span>Year: <span className={styles['color-details__details']}>{colorInfo.year}</span></span>
              <span>Created By:</span>
              <figure className={styles['color-details__creator']} onClick={goToCreator}>
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

export default ColorDetailsPage;