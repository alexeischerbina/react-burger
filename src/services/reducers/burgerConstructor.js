import {
  BURGER_CONSTRUCTOR_ADD,
  BURGER_CONSTRUCTOR_DELETE
} from '../actions/burgerConstructor';

const initialState = {
  bun: null,
  components: []
};

export const burgerContructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case BURGER_CONSTRUCTOR_ADD: {
      return action.ingredient.type === 'bun'
        ? {...state, bun: action.ingredient}
        : {...state, components: [...state.components, action.ingredient]};
    }
    case BURGER_CONSTRUCTOR_DELETE: {
      return {...state, components: state.components.filter((item, index) => index !== action.index)};
    }
    default: {
      return state;
    }
  }
}
