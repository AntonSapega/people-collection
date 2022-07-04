import { fork, join, put, takeEvery } from 'redux-saga/effects';
import  { LOAD_COLOR_DETAILS_MIDDLEWARE } from '../types';
import { getColor, getPerson } from '../../services/api/reqresApi';
import { getTextPlaceholder } from '../../services/api/jsonPlaceholderApi';
import { setColorDetails } from './actions';

function* getDetailsWorker({ payload: colorId }) {
  const fullInfo = yield join([
    yield fork(getColor, colorId),
    yield fork(getPerson, colorId),
    yield fork(getTextPlaceholder, colorId)
  ])

  yield put(setColorDetails({
    color: fullInfo[0].data.data,
    creator: fullInfo[1].data.data,
    description: fullInfo[2].data
  }))
}

export default function* colorDetailsPage() {
  yield takeEvery(LOAD_COLOR_DETAILS_MIDDLEWARE, getDetailsWorker);
}