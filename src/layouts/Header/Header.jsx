import React from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import UserProfile from '../../components/UserProfile/UserProfile';
import ProgressLoader from '../../components/ProgressLoader/ProgressLoader';
import { ROUTES } from '../../enums/ROUTES';

const Header = () => {
  const isActiveConditional = ({isActive}) => styles['header__link'] + (isActive ? ` ${styles['header__link_active']}` : '');

  return (
    <header className={styles['header']}>
      <Logo />

      <nav className={styles['header__nav']}>
        <NavLink className={isActiveConditional} to={ROUTES.initial}>Home</NavLink>
        <NavLink className={isActiveConditional} to={`${ROUTES.colors}/1`}>Colors</NavLink>
        <NavLink className={isActiveConditional} to={`${ROUTES.people}/1`}>People</NavLink>
        <NavLink className={isActiveConditional} to={ROUTES.settings}>Settings</NavLink>

        <div className={styles['header__user-profile']}>
          <UserProfile />
        </div>
      </nav>

      <ProgressLoader />
    </header>
  )
}

export default Header;