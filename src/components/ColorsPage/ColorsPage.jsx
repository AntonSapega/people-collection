import React, { useEffect, useState } from 'react';
import styles from './ColorsPage.module.scss';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ColorCard from '../ColorCard/ColorCard';
import Pagination from '../Pagination/Pagination';
import { useSelector } from 'react-redux';

const ColorsPage = () => {

  // const [colors, setColors] = useState(null);
  // const [totalPages, setTotalPages] = useState(null);

  const routeParams = useParams();
  const navigate = useNavigate();

  const colors = useSelector(state => state.colorsPage.colors);
  const totalPages = useSelector(state => state.colorsPage.pagesAmount)

  // useEffect(() => {
  //   requestColors(routeParams.page)
  // }, [routeParams])

  // function requestColors(pageNumber) {
  //   axios.get(`${process.env.REACT_APP_REQ_RES_URL}api/unknown?page=${pageNumber}`)
  //   .then(response => {
  //     setColors(response.data.data);
  //     setTotalPages(response.data.total_pages);
  //   });
  // }

  function increasePageNumber() {
    const nextPage = Number(routeParams.page) + 1;
    navigate(`/colors/${nextPage}`, {replace: false});
  }

  function decreasePageNumber() {
    const prevPage = Number(routeParams.page) - 1;
    navigate(`/colors/${prevPage}`, {replace: false});
  }

  function handleChosenPage(num) {
    navigate(`/colors/${num}`, {replace: false});
  }

  function openColorDetails(colorId) {
    navigate(`/colors/color-details/${colorId}`)
  }

  const renderColors = colors?.map(color => {
    return (
      <ColorCard
        key={color.name}
        color={color.color}
        name={color.name}
        style={{margin: '0 1.6rem 1.6rem 0'}}
        onColorCard={() => openColorDetails(color.id)} />
    )
  })

  return (
    <div className={styles['colors-page']}>
      <h1 className={styles['colors-page__title']}>Amazing Colors</h1>
      <div className={styles['colors-page__colors']}>
        {renderColors}
      </div>

      <Pagination
        activePage={routeParams.page}
        totalPages={totalPages}
        onBtnNumber={handleChosenPage}
        onIncreasePage={increasePageNumber}
        onDecreasePageNumber={decreasePageNumber}
      />
    </div>
  )
}

export default ColorsPage;