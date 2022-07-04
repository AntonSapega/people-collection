import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from "redux-first-history";
import { HistoryRouter } from "redux-first-history/rr6";
import rootReducer from './store/reducer'
import saga from './store/saga';

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ 
  history: createBrowserHistory(),
});

export const store = createStore(rootReducer(routerReducer), compose(
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(
      routerMiddleware,
      sagaMiddleware
      )
    )
))

export const history = createReduxHistory(store);
sagaMiddleware.run(saga);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
