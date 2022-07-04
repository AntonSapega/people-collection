// import React, { useState } from 'react';
// import styles from './Home.module.scss';

// const Home = () => {
//   const [radioValue, setRadioValue] = useState({
//     radioOne: {id: 1, checked: false},
//     radioTwo: {id: 2, checked: true},
//     radioThree: {id: 3, checked: false},
//   })

//   const [radioBtns, setRadioBtns] = useState([
//     {id: 1, checked: true},
//     {id: 2, checked: false},
//     {id: 3, checked: false},
//     {id: 4, checked: false},
//   ])

//   const [carouselMargin, setCarouselMargin] = useState({marginLeft: '0'});

//   function changeActiveRadioBtn(e) {
//     setRadioBtns(state => {
//       const keys = Object.values(state);
//       const newKeys = keys.map((radio, index) => {
//         if (Number(radio.id) === Number(e.target.value)) {
//           changeCarouselMargin(index, keys.length);
//           return {id: radio.id, checked: true};
//         }
//         return {id: radio.id, checked: false};
//       })
//       // const newState = changeElements(newKeys);
//       return newKeys;
//     })
//   }

//   function changeElements(array) {
//     const preparedArray = [...array];

//     array.forEach((element, index) => {
//       if (element.checked && index === array.length - 1) {
//         preparedArray.push(array[0]);
//         preparedArray.shift(array[0]);
//       }
//     })

//     return preparedArray;


//     // if (idx === stateValues.length - 1) {
//     //   console.log(idx);
//     //   console.log(stateValues);
//     //   return []
//     // }

//     // if (idx === 0) {
//     //   console.log(idx)
//     // }
//   }

//   function changeCarouselMargin(idx, slidersAmount) {
//     const sliderWidth = 100 / slidersAmount;
//     const computedMargin = sliderWidth * (idx + 1) - sliderWidth;
//     setCarouselMargin({marginLeft: `-${computedMargin}%`});
//   };

//   return (
//     <article className={styles.home}>
//       <div className={styles.shapedBackground}>
//         <section className={styles.description}>
//           <img className={styles.rhombus} src="/images/colors-rhombus.png" width="450px" height="450px" alt='colors rhombus'></img>
//           <h1 className={styles.tagline}>Genius people <br /> and their inventions <br /> in one place</h1>
//         </section>
//       </div>

//       <div className={styles.slider}>
//         <div className={styles['slider__container']}>
//           <div className={`${styles.slide} ${styles.slide__one}`} style={carouselMargin}>ONE</div>
//           <div className={`${styles.slide} ${styles.slide__two}`}>TWO</div>
//           <div className={`${styles.slide} ${styles.slide__three}`}>THREE</div>
//           <div className={`${styles.slide} ${styles.slide__four}`}>FOUR</div>
//         </div>
//         <div className={styles.slider__controller}>
//             {radioBtns.map(radio => {
//               return (
//                 <input
//                   key={radio.id}
//                   type='radio'
//                   name='radio-controller'
//                   value={radio.id}
//                   id={radio.id}
//                   checked={radio.checked}
//                   onChange={event => changeActiveRadioBtn(event)}
//                 />
//               )
//             })}
//         </div>
//       </div>
//     </article>
//   )
// }

// export default Home;



//******** */


// import React, { useEffect, useRef, useState } from 'react';
// import styles from './Home.module.scss';

// const Home = () => {

//   const [slides, setSlides] = useState([
//     {id: 1, active: false},
//     {id: 2, active: true},
//     {id: 3, active: false},
//     {id: 4, active: false},
//     {id: 5, active: false},
//     {id: 6, active: false},
//     {id: 7, active: false},
//     {id: 8, active: false},
//     {id: 9, active: false},
//     {id: 10, active: false},
//     {id: 11, active: false},
//     {id: 12, active: false},
//   ]);

//   const [cardWidth, setCardWidth] = useState(null);
//   const [cardRightMargin, setCardRightMargin] = useState(null);

//   const [sliderMargin, setSliderMargin] = useState(0); //! shift
//   const cardRef = useRef();
//   const sliderRef = useRef();

//   useEffect(() => {
//     changeCardSize();
//     window.addEventListener("resize", changeCardSize);

//     return () => {
//       window.removeEventListener("resize", changeCardSize);
//     };
//   }, [slides]);

//   function changeCardSize() {
//     const {cardHorizontalSize: width, cardMargin: margin} = calculateBasicSizes();
//     setCardWidth(width);
//     setCardRightMargin(margin);

//     //!!!
//     setSliderMargin(() => {
//       const {cardHorizontalSize: cardSize, cardMargin: margin} = calculateBasicSizes();
//       const activeSlideID = slides.find(slide => slide.active).id;
//       const shift = (activeSlideID - 2) * margin + (activeSlideID - 2) * cardSize;
//       return shift;
//     })
//   }

//   function calculateBasicSizes() {
//     const sliderWidth = sliderRef.current.clientWidth;
//     const cardHorizontalSize = 0.3 * sliderWidth;
//     const cardMargin = (sliderWidth - 3 * cardHorizontalSize) / 2;

//     return {
//       cardHorizontalSize,
//       cardMargin
//     }
//   }


//   function showPrevSlide() {
//     setSliderMargin(state => {
//       const mainCardGeometricParams = calculateBasicSizes();
//       const shiftSize = mainCardGeometricParams.cardHorizontalSize + mainCardGeometricParams.cardMargin;
//       return state + shiftSize;
//     });

//     console.log('showPrevSlide: ', sliderMargin)

//     setSlides(state => {
//       const currentActiveSlideID = state.find(slide => slide.active).id;
//       const newState = state.map(slide => {
//         if (slide.id === currentActiveSlideID) {
//           return {...slide, active: false};
//         }
//         if (slide.id - currentActiveSlideID === 1) {
//           return {...slide, active: true};
//         }
//         return slide;
//       })
//       return newState;
//     })
//   }

//   function showNextSlide() {
//     setSliderMargin(state => {
//       const mainCardGeometricParams = calculateBasicSizes();
//       const shiftSize = mainCardGeometricParams.cardHorizontalSize + mainCardGeometricParams.cardMargin;
//       return state - shiftSize;
//     });

//     setSlides(state => {
//       const currentActiveSlideID = state.find(slide => slide.active).id;
//       const newState = state.map(slide => {
//         if (slide.id === currentActiveSlideID) {
//           return {...slide, active: false};
//         }
//         if (currentActiveSlideID - slide.id === 1) {
//           return {...slide, active: true};
//         }
//         return slide;
//       })
//       return newState;
//     })
//   }

//   return (
//     <article className={styles.home}>
//       <div className={styles.shapedBackground}>
//         <section className={styles.description}>
//           <img className={styles.rhombus} src="/images/colors-rhombus.png" width="450px" height="450px" alt='colors rhombus'></img>
//           <h1 className={styles.tagline}>Genius people <br /> and their inventions <br /> in one place</h1>
//         </section>
//       </div>

//       <div className={styles.slider}>
//         <span className={`material-icons ${styles.navigation} ${styles.navigation_left}`} onClick={showNextSlide}>chevron_left</span>
//         <span className={`material-icons ${styles.navigation} ${styles.navigation_right}`} onClick={showPrevSlide}>chevron_right</span>
//         <div ref={sliderRef} className={styles['slider-frame']}>
//           <div className={styles['slides-shell']}>
//             {slides.map(slide => {
//               return (
//                 <div
//                   ref={cardRef}
//                   key={slide.id}
//                   className={styles.slide__wrapper}
//                   style={slide.id === 1 ? {marginLeft: `-${sliderMargin}px`} : {}}
//                 >
//                   <div
//                     style={{
//                       width: `${cardWidth}px`,
//                       marginRight: `${cardRightMargin}px`,
//                       }}
//                     className={!slide.active ? styles.slide : `${styles.slide} ${styles.slide_active}`}
//                   >{slide.id}</div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//       <button type='button' onClick={() => console.log(slides)}>SLIDES</button>
//     </article>
//   )
// }

// export default Home;





//***************************** */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../../components/shared/Carousel/Carousel';
import styles from './Home.module.scss';
import { getPeopleMiddleware } from '../../store/peoplePage/reducers';
import { loadHeroes } from '../../store/heroes/reducers';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../enums/ROUTES';

const Home = () => {
  const peopleFromServer = useSelector(state => state.peoplePage.people);
  const heroes = useSelector(state => state.heroes.heroes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getPeopleMiddleware(1));
    dispatch(loadHeroes());
  }, []);

  function navigateToPersonDetailsPage(hero) {
    navigate(`/${ROUTES.person}/${hero.id}`);
  }

  return (
    <article className={styles.home}>
      <div className={styles.shapedBackground}>
        <section className={styles.description}>
          <img className={styles.rhombus} src="/images/colors-rhombus.png" width="450px" height="450px" alt='colors rhombus'></img>
          <h1 className={styles.tagline}>Genius people <br /> and their inventions <br /> in one place</h1>
        </section>
      </div>
      <div className={styles['carousel-container']}>
        <Carousel slidesSet={heroes} title="Our Heroes" seeDetails={navigateToPersonDetailsPage} />
      </div>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa dolores tempore quas corporis harum ex ut optio nobis, obcaecati animi recusandae, aliquid numquam molestias officiis inventore praesentium similique temporibus ratione?
      </p>
    </article>
  )
}

export default Home;