import React from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import UserProfile from '../UserProfile/UserProfile';

const Header = () => {
  const isActiveConditional = ({isActive}) => styles['header__link'] + (isActive ? ` ${styles['header__link_active']}` : '');

  return (
    <header className={styles['header']}>
      <Logo />

      <nav className={styles['header__nav']}>
        <NavLink className={isActiveConditional} to="/">Home</NavLink>
        <NavLink className={isActiveConditional} to="/colors/1">Colors</NavLink>
        <NavLink className={isActiveConditional} to="/users/1">Users</NavLink>
        <NavLink className={isActiveConditional} to="/settings">Settings</NavLink>

        <div className={styles['header__user-profile']}>
          <UserProfile />
        </div>
      </nav>

    </header>
  )
}

export default Header;