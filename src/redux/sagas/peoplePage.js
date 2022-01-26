import { call, put, take } from "redux-saga/effects";
import { LOAD_PEOPLE_SET } from '../types';
import { getPeoplePage } from '../../httpAPIs/reqresApi';
import { loadPeoplePage } from '../actions';

export default function* peoplePage() {
  while(true) {
    const action = yield take(LOAD_PEOPLE_SET);
    console.log(action);
    const pageOfPeopleResponse = yield call(getPeoplePage, action.payload);
    const peopleArray = pageOfPeopleResponse.data.data;
    yield put(loadPeoplePage(peopleArray));
  }
}