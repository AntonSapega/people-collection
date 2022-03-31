// import React, { useRef, useState } from 'react';
// import styles from './Header.module.scss';
// import { NavLink } from 'react-router-dom';
// import Logo from '../../components/shared/Logo/Logo';
// import Dashboard from '../../components/Dashboard/Dashboard';
// import ProgressLoader from '../../components/ProgressLoader/ProgressLoader';
// import { ROUTES } from '../../enums/ROUTES';
// import Burger from '../../components/Burger/Burger';
// import useLogout from '../../hooks/useLogout';

// const Header = () => {
//   let isActiveConditional = ({isActive}) => styles['header__link'] + (isActive ? ` ${styles['header__link_active-mobile']}` : '');
//   const ref = useRef();
//   const logout = useLogout();

//   const [isShowMenu, setIsShowMenu] = useState(false);
//   const navStyle = isShowMenu ? styles['header__nav_mobile-version'] : styles['header__nav_mobile-version_hidden'];

//   function toggleNavMenu() {
//     setTimeout(() => {
//       setIsShowMenu(state => state = !isShowMenu);
//     }, 320);
//   }

//   function handleLogout() {
//     logout();
//   }

//   return (
//     <header className={styles['header']}>
//       <Logo />

//       <div className={styles.header__placeholder}></div>

//       <nav className={styles['header__nav_laptop-version']}>
//         <NavLink className={isActiveConditional} to={ROUTES.initial}>Home</NavLink>
//         <NavLink className={isActiveConditional} to={`${ROUTES.colors}`}>Colors</NavLink>
//         <NavLink className={isActiveConditional} to={`${ROUTES.people}`}>People</NavLink>
//         <NavLink className={isActiveConditional} to={ROUTES.settings}>Settings</NavLink>
//       </nav>

//       <div className={styles['header__burger-menu']}>
//         {/* <input
//           ref={ref}
//           className={styles.checkbox}
//           type="checkbox"
//           id="menu__toggle" />
//         <label className={styles.burgerToggle} htmlFor="menu__toggle">
//           <span className={styles.burgerToggle__slice}></span>
//         </label> */}
//         <Burger className={styles['header__burger-menu_burger']} isChecked={isShowMenu} changeCheckboxStatus={() => setIsShowMenu(state => state = !isShowMenu)} />

//         <nav className={navStyle}>
//           <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={ROUTES.initial}>Home</NavLink>
//           <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={`${ROUTES.colors}`}>Colors</NavLink>
//           <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={`${ROUTES.people}`}>People</NavLink>
//           <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={ROUTES.settings}>Settings</NavLink>
//           <a className={`${styles['header__link']} ${styles['header__link_logout']}`} onClick={handleLogout}>Log out</a>
//         </nav>
//       </div>

//       <div className={styles['header__user-profile']}>
//         <Dashboard />
//       </div>

//       <ProgressLoader />
//     </header>
//   )
// }

// export default Header;





import React, { useEffect, useRef } from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/shared/Logo/Logo';
import Dashboard from '../../components/Dashboard/Dashboard';
import ProgressLoader from '../../components/ProgressLoader/ProgressLoader';
import { ROUTES } from '../../enums/ROUTES';
import Burger from '../../components/Burger/Burger';
import useLogout from '../../hooks/useLogout';
import useOutsideAlerter from '../../hooks/useOutsideClick';

const Header = () => {
  let isActiveConditional = ({isActive}) => styles['header__link'] + (isActive ? ` ${styles['header__link_active-mobile']}` : '');
  const ref = useRef();
  const burgerMenuRef = useRef();
  const logout = useLogout();

  const outsideClick = useOutsideAlerter(burgerMenuRef);

  useEffect(() => {
    if (outsideClick) {
      ref.current.checked = false;
    }
  }, [outsideClick])

  function toggleNavMenu() {
    setTimeout(() => {
      ref.current.checked = !ref.current.checked;
    }, 320);
  }

  function handleLogout() {
    logout();
  }

  return (
    <header className={styles['header']}>
      <Logo />

      <div className={styles.header__placeholder}></div>

      <nav className={styles['header__nav_laptop-version']}>
        <NavLink className={isActiveConditional} to={ROUTES.initial}>Home</NavLink>
        <NavLink className={isActiveConditional} to={`${ROUTES.colors}`}>Colors</NavLink>
        <NavLink className={isActiveConditional} to={`${ROUTES.people}`}>People</NavLink>
        <NavLink className={isActiveConditional} to={ROUTES.settings}>Settings</NavLink>
      </nav>

      <div ref={burgerMenuRef} className={styles['header__burger-menu']}>
        <input
          className={styles.checkbox}
          ref={ref}
          tabIndex='2'
          type="checkbox"
          id="menu__toggle" />
        <label className={styles.burgerToggle} htmlFor="menu__toggle">
          <span className={styles.burgerToggle__slice}></span>
        </label>

        <nav className={styles['header__nav_mobile-version']}>
          <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={ROUTES.initial}>Home</NavLink>
          <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={`${ROUTES.colors}`}>Colors</NavLink>
          <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={`${ROUTES.people}`}>People</NavLink>
          <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={ROUTES.settings}>Settings</NavLink>
          <a className={`${styles['header__link']} ${styles['header__link_logout']}`} onClick={handleLogout}>Log out</a>
        </nav>
      </div>

      <div className={styles['header__user-profile']}>
        <Dashboard />
      </div>

      <ProgressLoader />
    </header>
  )
}

export default Header;