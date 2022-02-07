import { call, put, select } from 'redux-saga/effects';
import { getPeoplePage } from '../../services/api/reqresApi';
import { loadPeoplePage } from './actions';

export function* peoplePageWorker(pageNumber) {
  const { data } = yield call(getPeoplePage, pageNumber);
  if (Number(data.total_pages) === Number(pageNumber)) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const peopleCollectionCopy = yield select(state => state.peopleCollection.people);
    const isAlreadyExist = peopleCollectionCopy.find(human => human.id === user.id);

    if (!isAlreadyExist) {
      data.data.push(user);
    }
  }
  yield put(loadPeoplePage(data));
}