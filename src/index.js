import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './services/slices/index';
import {socketMiddleware} from './services/middleware'

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter as Router} from 'react-router-dom';

import {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionClosed,
  wsConnectionError,
  wsGetMessage
} from './services/slices/ws';

import {
  wsUserConnectionStart,
  wsUserConnectionSuccess,
  wsUserConnectionClosed,
  wsUserConnectionError,
  wsUserGetMessage
} from './services/slices/wsUser';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUserUrl = 'wss://norma.nomoreparties.space/orders'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    .concat(socketMiddleware(wsUrl, {
      wsConnectionStart,
      wsConnectionSuccess,
      wsConnectionClosed,
      wsConnectionError,
      wsGetMessage
    }))
    .concat(socketMiddleware(wsUserUrl, {
        wsConnectionStart: wsUserConnectionStart,
        wsConnectionSuccess: wsUserConnectionSuccess,
        wsConnectionClosed: wsUserConnectionClosed,
        wsConnectionError: wsUserConnectionError,
        wsGetMessage: wsUserGetMessage
      }, {checkToken: true})
    ),
  devTools: process.env.NODE_ENV !== 'production'
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <App/>
        </Router>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
