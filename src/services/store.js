import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';

import rootReducer from './slices/index';
import {socketMiddleware} from './middleware'

import {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionClosed,
  wsConnectionError,
  wsGetMessage
} from './slices/ws';

import {
  wsUserConnectionStart,
  wsUserConnectionSuccess,
  wsUserConnectionClosed,
  wsUserConnectionError,
  wsUserGetMessage
} from './slices/wsUser';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUserUrl = 'wss://norma.nomoreparties.space/orders';

export const initStore = () => configureStore({
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