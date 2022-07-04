// import React, { Children, useState, useEffect, useRef } from 'react';
// import styles from './Carousel.module.scss';
// import CarouselSlide from './CarouselSlide/CarouselSlide';

// const Carousel = ({ children, slidesSet }) => {
//   const [slides, setSlides] = useState(null);

//   const arrayChildren = Children.toArray(children);

//   const sliderFrameRef = useRef();
//   const cardRef = useRef();
//   const [firstCardShift, setFirstCardShift] = useState(0); //! shift
//   const [cardWidth, setCardWidth] = useState(null);
//   const [cardRightMargin, setCardRightMargin] = useState(null);

//   const [nextTimerID, setNextTimerID] = useState(null); //
//   const [prevTimerID, setPrevTimerID] = useState(null);

//   const [isActiveNextBtn, setActiveNextBtn] = useState(false);

//   const [isStraightLoopDirection, setLoopDirection] = useState(true);

//   useEffect(() => {
//     let timerId;
//     const interval = startInfiniteLoop.bind(null, slides);
//     // setNextTimerID(setInterval(interval, 6500));

//     timerId = setInterval(interval, 6500);

//     setSlides(() => {
//       const preparedSlides = slidesSet.map((slide, idx) => {
//         if (idx === 1) {
//           slide.active = true;
//           return slide;
//         }
//         slide.active = false;
//         return slide;
//       })
//       return preparedSlides;
//     })

//     return () => {
//       clearInterval(timerId);
//     }
//   }, []);

//   useEffect(() => {
//     // const isPenultimateActiveSlide = slides?.some(slide => slide.active && slide.slideId === slides.length - 1);

//     // if (isPenultimateActiveSlide) {
//     //   setNextTimerID(clearInterval(nextTimerID));
//     //   setPrevTimerID(setInterval(showPrevSlide, 6500));
//     // }

//     // const isSecondActiveSlide = slides?.some(slide => slide.active && slide.slideId === 2);

//     // if (isSecondActiveSlide) {
//     //   setPrevTimerID(clearInterval(prevTimerID));
//     //   setNextTimerID(setInterval(showNextSlide, 6500));
//     // }
    

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
//     setFirstCardShift(() => {
//       const {cardHorizontalSize: cardSize, cardMargin: margin} = calculateBasicSizes();
//       const activeSlideID = slides?.find(slide => slide.active).slideId;
//       const shift = (activeSlideID - 2) * margin + (activeSlideID - 2) * cardSize;
//       return shift;
//     })
//   }

//   function calculateBasicSizes() {
//     const sliderWidth = sliderFrameRef.current.clientWidth;
//     const cardHorizontalSize = 0.3 * sliderWidth;
//     const cardMargin = (sliderWidth - 3 * cardHorizontalSize) / 2;

//     return {
//       cardHorizontalSize,
//       cardMargin
//     }
//   }

//   function showNextSlide() {
//     setActiveNextBtn(true);
//     setTimeout(() => setActiveNextBtn(false), 320);

//     setFirstCardShift(state => {
//       const mainCardGeometricParams = calculateBasicSizes();
//       const shiftSize = mainCardGeometricParams.cardHorizontalSize + mainCardGeometricParams.cardMargin;
//       return state + shiftSize;
//     });

//     setSlides(state => {
//       const currentActiveSlideID = state.find(slide => slide.active).slideId;
//       const newState = state.map(slide => {
//         if (slide.slideId === currentActiveSlideID) {
//           return {...slide, active: false};
//         }
//         if (slide.slideId - currentActiveSlideID === 1) {
//           return {...slide, active: true};
//         }
//         return slide;
//       })
//       return newState;
//     })
//   }

//   function showPrevSlide() {
//     setFirstCardShift(state => {
//       const mainCardGeometricParams = calculateBasicSizes();
//       const shiftSize = mainCardGeometricParams.cardHorizontalSize + mainCardGeometricParams.cardMargin;
//       return state - shiftSize;
//     });

//     setSlides(state => {
//       const currentActiveSlideID = state.find(slide => slide.active).slideId;
//       const newState = state.map(slide => {
//         if (slide.slideId === currentActiveSlideID) {
//           return {...slide, active: false};
//         }
//         if (currentActiveSlideID - slide.slideId === 1) {
//           return {...slide, active: true};
//         }
//         return slide;
//       })
//       return newState;
//     })
//   }

//   function startInfiniteLoop() {
//     console.log(slides)
//   }

//   return (
//     <div className={styles.slider}>
//       <div>
//         <span className={`material-icons ${styles.navigation} ${styles.navigation_left}`} onClick={showPrevSlide}>chevron_left</span>
//       </div>
//       <div ref={sliderFrameRef} className={styles['slider-frame']}>
//         <div className={styles['slides-shell']}>
//           {slides?.map(slide => {
//             return (
//               <div
//                 ref={cardRef}
//                 key={slide.slideId}
//                 className={styles.slide__wrapper}
//                 style={slide.slideId === 1 ? {marginLeft: `-${firstCardShift}px`} : {}}>
//                 <div
//                   style={{
//                     width: `${cardWidth}px`,
//                     marginRight: `${cardRightMargin}px`,
//                     }}
//                   className={!slide.active ? styles.slide : `${styles.slide} ${styles.slide_active}`}>
//                   <CarouselSlide slide={slide} />
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//       <div>
//         <span className={`material-icons ${styles.navigation} ${styles.navigation_right} ${isActiveNextBtn ? styles.navigation_active : ''}`} onClick={showNextSlide}>chevron_right</span>
//       </div>
//     </div>
//   )
// }

// export default Carousel;



//************************ */
//************************ */
//************************ */

      // *** IntersectionObserver ***

    // let callbackFn = entries => {
  //   entries.forEach(element => {
  //     if (element.isIntersecting) {
  //       const timerIntervalID = setInterval(() => {
  //         setSlides(state => {
  //           if (state) {
  //             console.log('call loopExecutor');
  //             loopExecutor(state, timerIntervalID);
  //             return state;
  //           }
  //         });
  //       }, 3500);
  //     }
  //   })
  // };

  // useEffect(() => {
  //   if (slides?.length) {
  //     if (straightDirection) {
  //       setTimeout(showNextSlide, 5000);
  //       setSlidesAmount(slides.length - 1);
  //       console.log(slidesAmount)
  //     }
  //   }
  // }, [slides?.length, slidesAmount]);

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 1
  //   }

  //   const observer = new IntersectionObserver(callbackFn, options);
  //   if (sliderFrameRef.current) {
  //     observer.observe(sliderFrameRef.current);
  //   };

  //   return () => {
  //     if (sliderFrameRef.current) {
  //       observer.unobserve(sliderFrameRef.current);
  //     }
  //   }
  // }, []);

  //***************************** */
  //***************************** */
  //***************************** */


import React, { useState, useEffect, useRef } from 'react';
import styles from './Carousel.module.scss';
import CarouselSlide from './CarouselSlide/CarouselSlide';
import NavCircleBtn from '../NavCircleBtn/NavCircleBtn';

const Carousel = ({ title, slidesSet, seeDetails }) => {
  const [slides, setSlides] = useState(null);

  const sliderRef = useRef();
  const sliderFrameRef = useRef();
  const cardRef = useRef();
  const [firstCardShift, setFirstCardShift] = useState(0);
  const [cardWidth, setCardWidth] = useState(null);
  const [cardRightMargin, setCardRightMargin] = useState(null);
  const [amountVisibleCards, setAmountVisibleCards] = useState(3);

  useEffect(() => {
    if (slidesSet) {
      setSlides(() => {
        const deepCopy = JSON.parse(JSON.stringify(slidesSet));
        const preparedSlides = deepCopy.map((slide, idx) => {
          slide.slideId = idx + 1;
          if (idx === 1) {
            slide.active = true;
            return slide;
          }
          slide.active = false;
          return slide;
        })
        return preparedSlides;
      })
    }
  }, [slidesSet]);

  useEffect(() => {
    changeCardSize();
    window.addEventListener("resize", changeCardSize);

    return () => {
      window.removeEventListener("resize", changeCardSize);
    };
  }, [slides]);

  function changeCardSize() {
    const {cardHorizontalSize: width, cardMargin: margin} = calculateBasicSizes();
    setCardWidth(width);
    setCardRightMargin(margin);

    //!!!
    setFirstCardShift(() => {
      const {cardHorizontalSize: cardSize, cardMargin: margin} = calculateBasicSizes();
      const activeSlideID = findActiveSlide()?.slideId;
      const shift = (activeSlideID - 2) * margin + (activeSlideID - 2) * cardSize;
      if (activeSlideID === 2) console.log(2222)
      // const shift = activeSlideID === 2 ? margin : (activeSlideID - 2) * margin + (activeSlideID - 1) * cardSize;
      return shift;
    })
  }

  function findActiveSlide() {
    return slides?.find(slide => slide.active);
  }

  function isPreviousSlide() {
    if (findActiveSlide()?.slideId === slides?.length - 1) {
      return true;
    }
    return false;
  }

  function calculateBasicSizes() {
    const sliderWidth = sliderFrameRef.current.clientWidth;
    const cardHorizontalSize = 0.3 * sliderWidth;
    const cardMargin = (sliderWidth - 3 * cardHorizontalSize) / 2;
    // const cardMargin = (sliderWidth - cardHorizontalSize) / 2; //!!!!!

    return {
      cardHorizontalSize,
      cardMargin
    }
  }

  function showNextSlide() {
    if (isPreviousSlide()) {
      return;
    }

    setFirstCardShift(state => {
      const mainCardGeometricParams = calculateBasicSizes();
      const shiftSize = mainCardGeometricParams.cardHorizontalSize + mainCardGeometricParams.cardMargin;
      return state + shiftSize;
    });

    setSlides(state => {
      const currentActiveSlideID = findActiveSlide().slideId;
      const newState = state.map(slide => {
        if (slide.slideId === currentActiveSlideID) {
          return {...slide, active: false};
        }
        if (slide.slideId - currentActiveSlideID === 1) {
          return {...slide, active: true};
        }
        return slide;
      })
      return newState;
    })
  }

  function showPrevSlide() {
    const activeSlide = findActiveSlide();

    if (activeSlide.slideId === 2) {
      return;
    }

    setFirstCardShift(state => {
      const mainCardGeometricParams = calculateBasicSizes();
      const shiftSize = mainCardGeometricParams.cardHorizontalSize + mainCardGeometricParams.cardMargin;
      return state - shiftSize;
    });

    setSlides(state => {
      const currentActiveSlideID = findActiveSlide().slideId;
      const newState = state.map(slide => {
        if (slide.slideId === currentActiveSlideID) {
          return {...slide, active: false};
        }
        if (currentActiveSlideID - slide.slideId === 1) {
          return {...slide, active: true};
        }
        return slide;
      })
      return newState;
    })
  }

  return (
    <section className={styles.carousel}>
      <h2 className={styles['carousel__title']}>{title}</h2>
      <section ref={sliderRef} className={styles.slider}>
      <div className={styles.slider__btn}>
        <NavCircleBtn customClick={showPrevSlide} isDisable={findActiveSlide()?.slideId === 2} />
      </div>
      <div ref={sliderFrameRef} className={styles['slider-frame']}>
        <div className={styles['slides-shell']}>
          {slides?.map(slide => {
            return (
              <div
                ref={cardRef}
                key={slide.slideId}
                className={styles.slide__wrapper}
                style={slide.slideId === 1 ? {marginLeft: `-${firstCardShift}px`} : {}}>
                <div
                  style={{
                    width: `${cardWidth}px`,
                    marginRight: `${cardRightMargin}px`,
                    }}
                  className={!slide.active ? styles.slide : `${styles.slide} ${styles.slide_active}`}>
                  <CarouselSlide slide={slide} seeDetails={(obj) => seeDetails(obj)} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.slider__btn}>
        <NavCircleBtn orientation='right' customClick={showNextSlide} isDisable={isPreviousSlide()} />
      </div>
      </section>
    </section>
  )
}

export default Carousel;