// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styles from './TitlePaginationLayout.module.scss';
// import Pagination from "../../components/shared/Pagination/Pagination";

// const TitlePaginationLayout = ( {children, title, description, page, totalPages} ) => {
//   const navigate = useNavigate();

//   function goToNextPage() {
//     const nextPage = Number(page) + 1;
//     navigate(`${nextPage}`, {replace: false});
//   }

//   function goToPrevPage() {
//     const prevPage = Number(page) - 1;
//     navigate(`${prevPage}`, {replace: false});
//   }

//   function goToChosenPage(num) {
//     navigate(`${num}`, {replace: false});
//   }

//   return (
//     <div className={styles.page}>
//       <h1 className={styles.title}>{title}</h1>
//       <span className={styles.description}>{description}</span>

//       <div className={styles.children}>
//         {children}
//       </div>
//       <div className={styles.pagination}>
//         <Pagination
//           activePage={page}
//           totalPages={totalPages}
//           onBtnNumber={goToChosenPage}
//           onIncreasePage={goToNextPage}
//           onDecreasePageNumber={goToPrevPage}
//         />
//       </div>
//     </div>
//   )
// }

// export default TitlePaginationLayout;





import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from './TitlePaginationLayout.module.scss';
import Pagination from "../../components/shared/Pagination/Pagination";

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
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.description}>{description}</span>
      <input type='text' placeholder="find someone" value={inputValue} onChange={handleInput} />
      <h6>{inputValue}</h6>

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