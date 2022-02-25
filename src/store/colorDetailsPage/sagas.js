import { fork, join, put, takeEvery } from 'redux-saga/effects';
import { getColor, getPerson } from '../../services/api/reqresApi';
import { getTextPlaceholder } from '../../services/api/jsonPlaceholderApi';
import { setColorDetails } from './reducers';

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
  yield takeEvery('color_details/loadColorDetails', getDetailsWorker);
}