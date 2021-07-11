import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

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
      : state.components.push({
        id: lastId++,
        ingredient
      });
    },
    removeIngredient(state, { payload }) {
      state.components = state.components.filter((item, index) => index !== payload.index);
    },
    updateComponentsSort(state, { payload: { fromIndex, toIndex } }) {
      // Получили массив не Proxy-элментов
      const updatedComponents = [...state.components];
      const dragComponent = updatedComponents[fromIndex];
      updatedComponents.splice(fromIndex, 1); // удалили drag-компонент
      updatedComponents.splice(toIndex, 0, dragComponent); // вставили его в drop-место
      // модифицировали массив и вернули его в state.components
      state.components = updatedComponents;
    }
  },
});
export const { addIngredient, removeIngredient, updateComponentsSort } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
