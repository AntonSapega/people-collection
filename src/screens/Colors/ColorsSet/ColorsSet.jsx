import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ColorsSet.module.scss';
import ColorCard from "../ColorCard/ColorCard";
import { ROUTES } from "../../../enums/ROUTES";

const ColorsSet = () => {
  const navigate = useNavigate();
  const colors = useSelector(state => state.colorsPage.colors);

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
    </>
  )
}

export default ColorsSet;