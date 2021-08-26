import {createSlice} from '@reduxjs/toolkit';
import burgerConstructorReducer, {reset} from './burgerConstructor';
import burgerIngredientsReducer from './burgerIngredients';
import userSlice from './user';
import {getCookie} from "../utils";
import wsReducer from './ws';
import wsUserReducer from './wsUser';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false
  },
  reducers: {
    orderClose(state) {
      state.orderNumber = null;
    },
    orderRequest(state) {
      state.orderRequest = true;
      state.orderFailed = false;
    },
    orderSuccess(state, {payload}) {
      state.orderRequest = false;
      state.orderNumber = payload.orderNumber;
    },
    orderFailed(state) {
      state.orderRequest = false;
      state.orderFailed = true;
    }
  },
});

export const {orderClose, orderRequest, orderSuccess, orderFailed} = orderSlice.actions;

export function order(orderURL, ingredients) {
  return async function (dispatch) {
    dispatch(orderRequest());
    try {
      const response = await fetch(orderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': getCookie('accessToken')
        },
        body: JSON.stringify(ingredients)
      });
      const result = await response.json();
      if (result.success) {
        dispatch(orderSuccess({
          orderNumber: result.order.number
        }));
        dispatch(reset());
      } else {
        dispatch(orderFailed());
      }
    } catch(err) {
      console.log(err);
      dispatch(orderFailed);
    }
  }
}
const orderReducer = orderSlice.reducer;
export {orderReducer};

const rootReducer = {
  order: orderReducer,
  ingredients: burgerConstructorReducer,
  data: burgerIngredientsReducer,
  user: userSlice,
  orders: wsReducer,
  ordersUser: wsUserReducer
};

export default rootReducer;
