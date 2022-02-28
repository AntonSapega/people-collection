import styles from './Layout.module.scss';
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Logo from '../Logo/Logo';

const Layout = () => {
  return (
    <div className={styles['main-wrapper']}>
      <div className={styles['main-wrapper__content']}>
        <Header />
        <main className={styles["main"]}>
          <Outlet />
        </main>

        <footer className={styles["footer"]}>
          <div className={styles["footer__logo-wrapper"]}>
            <Logo />
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout;