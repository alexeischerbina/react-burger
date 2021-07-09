import {
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_FAILED
} from '../actions/burgerIngredients';

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_REQUEST: {
      return { ...state, dataRequest: true, dataFailed: false };
    }
    case BURGER_INGREDIENTS_SUCCESS: {
      return { ...state, data: action.data, dataRequest: false };
    }
    case BURGER_INGREDIENTS_FAILED: {
      return { ...state, dataRequest: false, dataFailed: true };
    }
    default: {
      return state;
    }
  }
}
