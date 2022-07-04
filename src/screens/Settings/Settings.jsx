import React, { useState, useRef, useEffect } from 'react';
import styles from './Settings.module.scss';

const Settings = () => {

  const [marsCoordinates, setMarsCoordinates] = useState({x: null, y: null});
  const marsOrbit = useRef();
  const marsRef = useRef();


  useEffect(() => {
    setMarsCoordinates({x: 2, y: 0});
  }, []);

  useEffect(() => {
    if (marsOrbit && marsCoordinates.y < 338) {
      setTimeout(() => {
        calcPlanetCoordinates(marsOrbit.current, marsCoordinates, setMarsCoordinates);
      }, 10);
    }
  }, [marsCoordinates])

  useEffect(() => {
    if (marsOrbit) {
      // const coordinates = calcPlanetCoordinates(marsOrbit.current);
      // marsOrbit.current.childNodes[0].style.bottom = '0px';
      // marsOrbit.current.childNodes[0].style.left = '170px';
    }
  }, [marsOrbit]);

  function calcPlanetCoordinates(planetOrbit, planetCoordinates, setPlanetCoordinates) {
    // console.log(x.getClientRects())
    // console.log(x.clientWidth)
    const orbitDiameter = planetOrbit.clientHeight;
    const orbitRadius = orbitDiameter / 2;
    // const orbitCenterX = orbitSize / 2;
    // const orbitCenterY = orbitSize / 2;

    let {x, y} = planetCoordinates;

    if (y < orbitDiameter) {
      y = y + 1;
    }

    if (y)

    if (x) {
      const a = Math.abs(Math.pow(orbitDiameter, 2) - 4*Math.pow(orbitDiameter, 2) + 4*(Math.pow(orbitRadius, 2) + Math.pow(y, 2)-2*orbitRadius*y));
      x = (orbitDiameter + Math.sqrt(a))/2
      
      console.log('x: ', x);
      console.log('y: ', y);
    }
    setPlanetCoordinates({x, y});
  }

  return (
    // <h1>Settings Page works!!!</h1>

    <div className={styles.universe}>
      <div className={styles.sun}></div>

      <div ref={marsOrbit} className={styles["mars-orbit"]}>
        <div
          ref={marsRef}
          className={styles.mars}
          style={{
            position: 'absolute',
            left: `${marsCoordinates.x}px`,
            bottom: `${marsCoordinates.y}px`
          }}></div>
      </div>
    </div>
  )
}

export default Settings;