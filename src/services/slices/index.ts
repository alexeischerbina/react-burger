import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import burgerConstructorReducer, {reset} from './burgerConstructor';
import burgerIngredientsReducer from './burgerIngredients';
import userSlice from './user';
import {getCookie} from "../utils";
import wsReducer from './ws';
import wsUserReducer from './wsUser';

export interface IOrderState {
  orderNumber: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState:IOrderState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false
};

const order = createAsyncThunk(
    'order/createOrder',
    async (params: { orderURL: string, ingredients: { ingredients: Array<string> } }, {dispatch}) => {
      dispatch(orderRequest());
      const {orderURL, ingredients} = params;
      const response = await fetch(orderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': 'Bearer ' + getCookie('accessToken')
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
    }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderClose(state) {
      state.orderNumber = null;
    },
    orderRequest(state) {
      state.orderRequest = true;
      state.orderFailed = false;
    },
    orderSuccess(state, {payload}: PayloadAction<{orderNumber: number}>) {
      state.orderRequest = false;
      state.orderNumber = payload.orderNumber;
    },
    orderFailed(state) {
      state.orderRequest = false;
      state.orderFailed = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(order.rejected, (state, action) => {
      console.log(action.error);
      orderFailed();
    });
  }
});

export const {orderClose, orderRequest, orderSuccess, orderFailed} = orderSlice.actions;

export {order};
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
