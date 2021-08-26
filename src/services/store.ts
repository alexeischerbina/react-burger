import thunk/*, {ThunkAction}*/ from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
// import {Action, ActionCreator} from 'redux';

import rootReducer from './slices';
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

const initStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    .concat(socketMiddleware(wsUrl, {
      wsConnectionStart,
      wsConnectionSuccess,
      wsConnectionClosed,
      wsConnectionError,
      wsGetMessage
    }, {checkToken: false}))
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

export const store = initStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/***
 Возникли проблемы, от наставника была информация:
 "А тип AppThunk  с тулкитом похоже совсем не понадобится"

 export type AppThunk<TReturn = void> = ActionCreator<
      ThunkAction<TReturn, Action, RootState, Action>
     >;
***/