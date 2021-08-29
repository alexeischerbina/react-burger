import {getCookie} from '../utils';
import {Middleware} from "redux";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export const socketMiddleware = (wsUrl: string,
                                 wsActions: { [key: string]: ActionCreatorWithoutPayload |  ActionCreatorWithPayload<any, string> },
                                 {checkToken}: {checkToken?: boolean}):Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const {dispatch} = store;
      const {
        wsConnectionStart,
        wsConnectionSuccess,
        wsConnectionClosed,
        wsConnectionError,
        wsGetMessage
      } = wsActions;

      if (wsConnectionStart.match(action)) {
        socket = new WebSocket(`${wsUrl}${checkToken ? ('?token=' + getCookie('accessToken')) : ''}`);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(wsConnectionSuccess({}));
        };

        socket.onerror = () => {
          dispatch(wsConnectionError({}));
        };

        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          const {success, ...restParsedData} = parsedData;

          dispatch(wsGetMessage(restParsedData))
        };

        socket.onclose = () => {
          dispatch(wsConnectionClosed({}));
        };
      }

      next(action);
    };
  };
};
