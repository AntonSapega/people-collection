import { call, debounce, put, takeEvery } from 'redux-saga/effects';
import { getColorsPage } from '../../services/api/reqresApi';
import { addColorsOnPage } from './actions';
import { LOAD_PARTICULAR_COLORS, LOAD_COLORS } from '../../store/types';

// export function* colorsPageWorker(pageNumber) {
//   const { data } = yield call(getColorsPage, pageNumber);
//   yield put(addColorsOnPage(data));
// }

export function* colorsPageWorker( {payload: pageNumber} ) {
  const { data } = yield call(getColorsPage, pageNumber);
  yield put(addColorsOnPage(data));
}

function* allColors(page = 1) {
  const response = yield call(getColorsPage, page);
  const colors = response.data.data;
  if (response.data.page < response.data.total_pages) {
    const num = page + 1;
    const request = yield call(allColors, num);
    colors.push(...request)
  }
  return colors;
}

export function* getColors( {payload: inputValue} ) {
  const colors = yield call(allColors, 1);
  const filteredColors = colors.filter(color => color.name.toLowerCase().includes(inputValue.toLowerCase()));
  console.log(filteredColors);
  yield put(addColorsOnPage({data: filteredColors}));
}

export function* colorsPageWatcher() { //! It is not being used
  yield takeEvery(LOAD_COLORS, colorsPageWorker);
}

export function* loadParticularColorsWatcher() {
  // yield takeEvery(LOAD_PARTICULAR_COLORS, getColors);
  yield debounce(600, LOAD_PARTICULAR_COLORS, getColors);
}