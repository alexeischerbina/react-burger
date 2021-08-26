import {createSlice} from '@reduxjs/toolkit';
import {IOrder} from "../types";

export type TUserWSState = {
  orders: Array<IOrder>;
  wsConnected: boolean;
}
const initialState: TUserWSState = {
  orders: [],
  wsConnected: false
};

const wsUserSlice = createSlice({
  name: 'wsUser',
  initialState,
  reducers: {
    wsUserConnectionStart() {
      // state.wsConnected = true;
    },
    wsUserConnectionSuccess(state) {
      state.wsConnected = true;
    },
    wsUserConnectionClosed(state) {
      state.wsConnected = false;
    },
    wsUserConnectionError(state) {
      state.wsConnected = false;
    },
    wsUserGetMessage(state, {payload}) {
      state.orders = payload.orders;
    }
  },
});
export const {
  wsUserConnectionStart,
  wsUserConnectionSuccess,
  wsUserConnectionClosed,
  wsUserConnectionError,
  wsUserGetMessage
} = wsUserSlice.actions;

export default wsUserSlice.reducer;
