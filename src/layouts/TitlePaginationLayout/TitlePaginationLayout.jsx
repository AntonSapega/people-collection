import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from './TitlePaginationLayout.module.scss';
import Pagination from "../../components/shared/Pagination/Pagination";
import PrimaryInput from "../../components/shared/PrimaryInput/PrimaryInput";

const TitlePaginationLayout = ( {children, title, description, page, totalPages} ) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

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

  function handleInput(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.description}>{description}</span>
        </div>
        <div className={styles.header__finder}>
          <div className={`material-icons ${styles.header__finderIcon}`}>search</div>
          <PrimaryInput
            // labelTitle='Try to find'
            inputType='text'
            inputName='searcher'
            inputPlaceholder="search"
            // handleBlur={() => console.log('blur')}
            handleChange={handleInput}
            inputValue={inputValue}
            // warningMessage={people}
          />
        </div>
      </section>

      <div className={styles.children}>
        <Outlet context={[inputValue]} />
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