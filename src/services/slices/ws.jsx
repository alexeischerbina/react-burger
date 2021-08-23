import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: {},
  wsConnected: false
};

const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnectionStart(state) {
      // state.wsConnected = true;
    },
    wsConnectionSuccess(state) {
      state.wsConnected = true;
    },
    wsConnectionClosed(state) {
      state.wsConnected = false;
    },
    wsConnectionError(state) {
      state.wsConnected = false;
    },
    wsGetMessage(state, {payload}) {
      state.orders = payload;
    }
  },
});
export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionClosed,
  wsConnectionError,
  wsGetMessage
} = wsSlice.actions;

export default wsSlice.reducer;
