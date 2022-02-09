import styles from './ColorsPage.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import ColorCard from '../ColorCard/ColorCard';
import Pagination from '../../../components/shared/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../enums/ROUTES';

const ColorsPage = () => {
  const routeParams = useParams();
  const navigate = useNavigate();

  const colors = useSelector(state => state.colorsPage.colors);
  const totalPages = useSelector(state => state.colorsPage.pagesAmount)

  function increasePageNumber() {
    const nextPage = Number(routeParams.page) + 1;
    navigate(`${ROUTES.colors}/${nextPage}`, {replace: false});
  }

  function decreasePageNumber() {
    const prevPage = Number(routeParams.page) - 1;
    navigate(`${ROUTES.colors}/${prevPage}`, {replace: false});
  }

  function handleChosenPage(num) {
    navigate(`${ROUTES.colors}/${num}`, {replace: false});
  }

  function openColorDetails(colorId) {
    navigate(`${ROUTES.color}/${colorId}`)
  }

  const renderColors = colors?.map(color => {
    return (
      <ColorCard
        key={color.name}
        color={color.color}
        name={color.name}
        style={{margin: '0 1.6rem 1.6rem 0'}}
        onColorCard={() => openColorDetails(color.id)} />
    )
  })

  return (
    <div className={styles['colors-page']}>
      <h1 className={styles['colors-page__title']}>Amazing Colors</h1>
      <div className={styles['colors-page__colors']}>
        {renderColors}
      </div>

      <div className={styles['colors-page__pagination']}>
        <Pagination
          activePage={routeParams.page}
          totalPages={totalPages}
          onBtnNumber={handleChosenPage}
          onIncreasePage={increasePageNumber}
          onDecreasePageNumber={decreasePageNumber}
        />
      </div>
    </div>
  )
}

export default ColorsPage;