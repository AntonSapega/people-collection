import { Outlet } from "react-router-dom";
import styles from './AppLayout.module.scss';
import Header from "../Header/Header";
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const AppLayout = () => {
  return (
    <div className={styles['main-wrapper']}>
      <div className={styles['main-wrapper__content']}>
        <Header />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </div>
    </div>
  )
}

export default AppLayout;