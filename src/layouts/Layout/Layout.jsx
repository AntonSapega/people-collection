import styles from './Layout.module.scss';
import Header from "../Header/Header";
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <div className={styles['main-wrapper']}>
      <div className={styles['main-wrapper__content']}>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  )
}

export default Layout;