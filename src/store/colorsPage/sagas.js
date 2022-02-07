import { call, put } from 'redux-saga/effects';
import { getColorsPage } from '../../services/api/reqresApi';
import { addColorsOnPage } from './actions';

export function* colorsPageWorker(pageNumber) {
  const { data } = yield call(getColorsPage, pageNumber);
  yield put(addColorsOnPage(data));
}