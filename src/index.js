import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UsersContextProvider } from './utils/UsersContext';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UsersContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
