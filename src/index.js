import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from "redux-first-history";
import { HistoryRouter } from "redux-first-history/rr6";
import { rootReducer } from './redux/rootReducer';
import thunk from 'redux-thunk';
import rootSaga from './redux/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ 
  history: createBrowserHistory(),
});

export const store = createStore(rootReducer(routerReducer), compose(
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(
      routerMiddleware,
      thunk,
      sagaMiddleware
      )
    )
))

export const history = createReduxHistory(store);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);
