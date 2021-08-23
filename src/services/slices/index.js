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

const {orderClose, orderRequest, orderSuccess, orderFailed} = orderSlice.actions;

export {orderClose};

export function order(orderURL, ingredients) {
  return function (dispatch) {
    dispatch(orderRequest());
    fetch(orderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': getCookie('accessToken')
      },
      body: JSON.stringify(ingredients)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          dispatch(orderSuccess({
            orderNumber: result.order.number
          }));
          dispatch(reset());
        } else {
          dispatch(orderFailed());
        }
      })
      .catch(err => {
        dispatch(orderFailed);
      });
  }
}

const rootReducer = {
  order: orderSlice.reducer,
  ingredients: burgerConstructorReducer,
  data: burgerIngredientsReducer,
  user: userSlice,
  orders: wsReducer,
  ordersUser: wsUserReducer
};

export default rootReducer;
