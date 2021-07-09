import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerContructorReducer } from './burgerConstructor';

import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_CLOSE,
  SHOW_INGREDIENT_INFO,
  HIDE_INGREDIENT_INFO
} from '../actions/index';

const initialOrderState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false
 };

const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case ORDER_CLOSE: {
      return { ...state, orderNumber: null };
    }
    case ORDER_REQUEST: {
      return { ...state, orderRequest: true, orderFailed: false };
    }
    case ORDER_SUCCESS: {
      return { ...state, orderRequest: false, orderNumber: action.orderNumber };
    }
    case ORDER_FAILED: {
      return { ...state, orderRequest: false, orderFailed: true };
    }
    default: {
      return state;
    }
  }
}

const initialCurrentIngredientState = {
    currentIngredient: null
};

const currentIngredientReducer = (state = initialCurrentIngredientState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_INFO: {
      return {...state, currentIngredient: action.ingredient};
    }
    case HIDE_INGREDIENT_INFO: {
      return {...state, currentIngredient: null};
    }
    default: {
      return state;
    }
  }
}

export const rootReducer = combineReducers({
    data: burgerIngredientsReducer,
    ingredients: burgerContructorReducer,
    order: orderReducer,
    currentIngredient: currentIngredientReducer
  });
