import React from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import styles from './Colors.module.scss';
import Pagination from '../../components/shared/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Colors = () => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const totalPages = useSelector(state => state.colorsPage.pagesAmount);

  useEffect(() => {
    if (!routeParams.page) {
      navigate('1');
    }
  }, [routeParams])

  function goToNextPage() {
    const nextPage = Number(routeParams.page) + 1;
    navigate(`${nextPage}`, {replace: false});
  }

  function goToPrevPage() {
    const prevPage = Number(routeParams.page) - 1;
    navigate(`${prevPage}`, {replace: false});
  }

  function goToChosenPage(num) {
    navigate(`${num}`, {replace: false});
  }

  return (
    <div className={styles['colors-page']}>
      <h1 className={styles['colors-page__title']}>Amazing Colors</h1>
      <div className={styles['colors-page__colors']}>
        <Outlet />
      </div>

      <div className={styles['colors-page__pagination']}>
        <Pagination
          activePage={routeParams.page}
          totalPages={totalPages}
          onBtnNumber={goToChosenPage}
          onIncreasePage={goToNextPage}
          onDecreasePageNumber={goToPrevPage}
        />
      </div>
    </div>
  )
}

export default Colors;