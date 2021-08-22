import {getCookie} from '../utils';

export const socketMiddleware = (wsUrl, wsActions, {checkToken} = {}) => {
  return store => {
    let socket = null;

    return next => action => {
      const {dispatch} = store;
      const {type} = action;
      const {
        wsConnectionStart,
        wsConnectionSuccess,
        wsConnectionClosed,
        wsConnectionError,
        wsGetMessage
      } = wsActions;

      if (type === wsConnectionStart().type) {
        socket = new WebSocket(`${wsUrl}${checkToken ? ('?token=' + getCookie('accessToken').slice(7)) : ''}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch(wsConnectionSuccess());
        };

        socket.onerror = event => {
          dispatch(wsConnectionError());
        };

        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          const {success, ...restParsedData} = parsedData;

          dispatch(wsGetMessage(restParsedData))
        };

        socket.onclose = event => {
          dispatch(wsConnectionClosed());
        };
      }

      next(action);
    };
  };
};
