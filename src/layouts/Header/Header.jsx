import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/shared/Logo/Logo';
import Dashboard from '../../components/Dashboard/Dashboard';
import ProgressLoader from '../../components/ProgressLoader/ProgressLoader';
import { ROUTES } from '../../enums/ROUTES';
import Burger from '../../components/BurgerMenu/BurgerMenu';
import useLogout from '../../hooks/useLogout';
import useOutsideAlerter from '../../hooks/useOutsideClick';
import Modal from '../../components/Modal/Modal';

const Header = () => {
  let isActiveConditional = ({isActive}) => styles['navigation__link'] + (isActive ? ` ${styles['navigation__link_active']}` : '');
  const ref = useRef();
  const burgerMenuRef = useRef();
  const logout = useLogout();
  const outsideClick = useOutsideAlerter(burgerMenuRef);
  const [isPopupVisible, setPopupVisible] = useState(false);

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

  function handleLogout(userResult) {
    if (userResult) {
      logout();
      return;
    }
    setPopupVisible(false);
  }

  function handlePopupAction() {
    setPopupVisible(true);
  }

  return (
    <header className={styles['header']}>
      <Logo />
      <nav className={styles['navigation']}>
        <NavLink className={isActiveConditional} to={ROUTES.initial}>Home</NavLink>
        <NavLink className={isActiveConditional} to={`${ROUTES.colors}`}>Colors</NavLink>
        <NavLink className={isActiveConditional} to={`${ROUTES.people}`}>People</NavLink>
        <NavLink className={isActiveConditional} to={ROUTES.settings}>Settings</NavLink>
      </nav>

      <div ref={burgerMenuRef} className={styles['burger-menu']}>
        <Burger ref={ref}>
          <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={ROUTES.initial}>Home</NavLink>
          <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={`${ROUTES.colors}`}>Colors</NavLink>
          <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={`${ROUTES.people}`}>People</NavLink>
          <NavLink className={isActiveConditional} onClick={toggleNavMenu} to={ROUTES.settings}>Settings</NavLink>
          <a className={`${styles['navigation__link']} ${styles['navigation__link-logout']}`} onClick={handlePopupAction}>Log out</a>
        </Burger>
      </div>

      <div className={styles['user-profile']}>
        <Dashboard />
      </div>

      <ProgressLoader />

      {isPopupVisible &&
        <Modal
          title="Log out"
          type={"action"}
          agreementButtonName='Sure'
          userChoice={(result) => handleLogout(result)}>
          {`Are you sure you want log out?`}
        </Modal>
      }
    </header>
  )
}

export default Header;