import { call, put } from 'redux-saga/effects';
import { getPerson, getColor } from '../../services/api/reqresApi';
import { getPersonDetails } from './actions';
import { sessionController } from '../../services/storage/sessionController';

export function* personPageDetailsWorker(id) {
  const user = sessionController.getUser();
  try {
    const person = yield call(getPerson, id);
    const colorDetails = yield call(getColor, id);

    const personFullInfo = {
      mainInfo: person.data.data,
      favoriteColor: colorDetails.data.data
    };

    yield put(getPersonDetails(personFullInfo));
  }
  catch(error) {
    if (error.response.status === 404 && user.id === id) {
      yield put(getPersonDetails({mainInfo: user, favoriteColor: {}}))
    }
  }
}