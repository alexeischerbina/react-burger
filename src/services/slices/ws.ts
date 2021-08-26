import {createSlice} from '@reduxjs/toolkit';
import {IOrder} from "../types";

export type TOrderResponse = {
  success?: boolean;
  orders?: Array<IOrder>;
  total?: number;
  totalToday?: number;
};

export type TWSState = {
  orders: TOrderResponse;
  wsConnected: boolean;
}

const initialState: TWSState = {
  orders: {},
  wsConnected: false
};

const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnectionStart() {
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
