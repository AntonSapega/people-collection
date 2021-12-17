import React from 'react';
import styles from './Header.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';

const Header = () => {
  const isActiveConditional = ({isActive}) => styles['header__link'] + (isActive ? ` ${styles['header__link_active']}` : '');
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    sessionStorage.setItem('token', 'false');
    navigate('/', {replace: true});
  }

  return (
    <header className={styles['header']}>
      <Logo />

      <nav className={styles['header__nav']}>
        <NavLink className={isActiveConditional} to="/">Home</NavLink>
        <NavLink className={isActiveConditional} to="/company">Company</NavLink>
        <NavLink className={isActiveConditional} to="/users">Users</NavLink>
        <NavLink className={isActiveConditional} to="/settings">Settings</NavLink>

        <div className={styles["user-badge"]}>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      </nav>

    </header>
  )
}

export default Header;