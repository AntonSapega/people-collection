import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './TitlePaginationLayout.module.scss';
import Pagination from "../../components/shared/Pagination/Pagination";

const TitlePaginationLayout = ( {children, page, totalPages} ) => {
  const navigate = useNavigate();

  function goToNextPage() {
    const nextPage = Number(page) + 1;
    navigate(`${nextPage}`, {replace: false});
  }

  function goToPrevPage() {
    const prevPage = Number(page) - 1;
    navigate(`${prevPage}`, {replace: false});
  }

  function goToChosenPage(num) {
    navigate(`${num}`, {replace: false});
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>People</h1>
      <span className={styles.description}>List of people</span>

      <div className={styles.children}>
        {children}
      </div>
      <div className={styles.pagination}>
        <Pagination
          activePage={page}
          totalPages={totalPages}
          onBtnNumber={goToChosenPage}
          onIncreasePage={goToNextPage}
          onDecreasePageNumber={goToPrevPage}
        />
      </div>
    </div>
  )
}

export default TitlePaginationLayout;