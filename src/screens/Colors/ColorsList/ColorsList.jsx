import React, { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import styles from './ColorsList.module.scss';
import ColorCard from "../ColorCard/ColorCard";
import { ROUTES } from "../../../enums/ROUTES";
import { loadParticularColors } from '../../../store/colorsPage/reducers';
import { loadColors } from '../../../store/colorsPage/reducers';
import NothingFound from '../../../components/shared/NothingFound/NothingFound';

const ColorsList = () => {
  const navigate = useNavigate();
  const colors = useSelector(state => state.colorsPage.colors);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [inputValue] = useOutletContext();

  useEffect(() => {
    if (inputValue) {
      dispatch(loadParticularColors(inputValue));
      return;
    }
    dispatch(loadColors(routeParams.page));
  }, [inputValue, routeParams.page]);

  function openColorDetails(colorId) {
    navigate(`/${ROUTES.color}/${colorId}`);
  }

  return (
    <>
      {
        colors?.map(color => {
          return (
            <div className={styles.card} key={color.name}>
              <ColorCard
                color={color.color}
                name={color.name}
                onColorCard={() => openColorDetails(color.id)} />
            </div>
          )
        })
      }
      {colors.length === 0 &&
        <div className={styles.empty_page}>
          <NothingFound />
        </div>
      }
    </>
  )
}

export default ColorsList;