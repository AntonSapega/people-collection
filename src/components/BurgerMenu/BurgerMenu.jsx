import React from "react";
import styles from './BurgerMenu.module.scss';

const Burger = React.forwardRef((props, ref) => {
  return (
    <div className={styles.burgerMenu}>
      <input
        className={styles.checkbox}
        ref={ref}
        tabIndex='2'
        type="checkbox"
        id="menu__toggle" />
      <label className={styles.burgerToggle} htmlFor="menu__toggle">
        <span className={styles.burgerToggle__slice}></span>
      </label>

      <nav className={styles['navigation__mobile-version']}>
        {/* Children should only be 'a' tag (NavLink will be convert to 'a' tag) */}
        {props.children}
      </nav>
      
    </div>
  )
})

export default Burger;