import { createSlice } from '@reduxjs/toolkit';

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    bun: null,
    components: []
  },
  reducers: {
    addIngredient(state, { payload: { ingredient } }) {
      ingredient.type === 'bun'
      ? state.bun = ingredient
      : state.components.push(ingredient);
    },
    removeIngredient(state, { payload }) {
      state.components = state.components.filter((item, index) => index !== payload.index);
    }
  },
});
export const { addIngredient, removeIngredient } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
