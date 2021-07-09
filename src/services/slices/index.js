import { createSlice } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burgerConstructor';
import burgerIngredientsReducer from './burgerIngredients';


const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: { currentIngredient: null },
  reducers: {
    showIngredientInfo(state, action) {
      state.currentIngredient = action.payload.ingredient;
    },
    hideIngredientInfo(state) {
      state.currentIngredient = null;
    }
  },
})


export const { showIngredientInfo, hideIngredientInfo } = currentIngredientSlice.actions;

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
    orderSuccess(state, { payload }) {
      state.orderRequest = false;
      state.orderNumber =  payload.orderNumber;
    },
    orderFailed(state) {
      state.orderRequest = false;
      state.orderFailed = true;
    }
  },
});

const { orderClose, orderRequest, orderSuccess, orderFailed } = orderSlice.actions;

export { orderClose };

export function order(orderURL, ingredients) {
  return function(dispatch) {
    dispatch(orderRequest());
    fetch(orderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(ingredients)
    })
    .then(response => response.json())
    .then(result => {
      result.success
      ? dispatch(orderSuccess({
        orderNumber: result.order.number
      }))
      : dispatch(orderFailed());
    })
    .catch(err => {
      dispatch(orderFailed);
    });
  }
}

const rootReducer = {
  currentIngredient: currentIngredientSlice.reducer,
  order: orderSlice.reducer,
  ingredients: burgerConstructorReducer,
  data: burgerIngredientsReducer
};

export default rootReducer;
