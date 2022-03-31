// import React, { useEffect, useState } from "react";
// import styles from './Burger.module.scss';

// const Burger = ({ status }) => {
//   const [isChecked, setChecked] = useState(true);

//   function toggleCheckboxStatus() {
//     setChecked(state => state = !isChecked);
//     return status(isChecked);
//   }

//   return (
//     <div className={styles.burgerMenu}>
//       <input
//         className={styles.checkbox}
//         type="checkbox"
//         checked={!isChecked}
//         onChange={toggleCheckboxStatus}
//         id="menu__toggle" />
//       <label className={styles.burgerToggle} htmlFor="menu__toggle">
//         <span className={styles.burgerToggle__slice}></span>
//       </label>
//     </div>
//   )
// }

// export default Burger;




import React from "react";
import styles from './Burger.module.scss';

const Burger = ({ isChecked, changeCheckboxStatus }) => {
  return (
    <div className={styles.burgerMenu}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isChecked}
        onChange={() => changeCheckboxStatus(!isChecked)}
        id="menu__toggle" />
      <label className={styles.burgerToggle} htmlFor="menu__toggle">
        <span className={styles.burgerToggle__slice}></span>
      </label>
    </div>
  )
}

export default Burger;