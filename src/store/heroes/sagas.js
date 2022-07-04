import { fork, join, put, takeEvery, all, call } from 'redux-saga/effects';
import { getPeoplePage } from '../../services/api/reqresApi';
import { getTextPlaceholder } from '../../services/api/jsonPlaceholderApi';
import { addHeroes } from './reducers';

// function* getDetailsWorker({ payload: colorId }) {
//   const fullInfo = yield join([
//     yield fork(getColor, colorId),
//     yield fork(getPerson, colorId),
//     yield fork(getTextPlaceholder, colorId)
//   ])

//   yield put(setColorDetails({
//     color: fullInfo[0].data.data,
//     creator: fullInfo[1].data.data,
//     description: fullInfo[2].data
//   }))
// }

function* getHeroesWorker() {
  const heroesRequest = yield fork(getPeoplePage, 2);
  const res = yield join(heroesRequest);
  const heroes = res.data.data;

  const heroDescriptionRequests = yield heroes.map(hero => {
    return call(getTextPlaceholder, hero.id);
  });

  const heroesDescriptionResponses = yield all(heroDescriptionRequests);
  const heroesDescriptions = yield heroesDescriptionResponses.map(hero => hero.data);

  yield heroes.map(hero => {
    const heroId = hero.id;
    const ownDescription = heroesDescriptions.find(desc => desc.id === heroId);
    hero.info = ownDescription.body;
  })

  yield put(addHeroes(heroes));
}

export default function* loadHeroes() {
  yield takeEvery('heroes/loadHeroes', getHeroesWorker);
}