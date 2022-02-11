import React, { useEffect } from "react";
import styles from './People.module.scss';
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Pagination from '../../components/shared/Pagination/Pagination';
import { useSelector } from "react-redux";

const People = () => {
  const navigate = useNavigate();
  const routeParams = useParams();
  const totalPages = useSelector(state => state.peoplePage.pagesAmount);

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
    <div className={styles['users-page']}>
      <h1 className={styles['users-page__title']}>People</h1>
      <span className={styles['users-page__description']}>List of people</span>

      <div className={styles['users-page__users']}>
        <Outlet />
      </div>
      <div className={styles['users-page__pagination-wrapper']}>
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

export default People;