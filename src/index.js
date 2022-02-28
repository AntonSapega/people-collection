import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UsersContextProvider } from './utils/UsersContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersContextProvider>
        <App />
      </UsersContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
