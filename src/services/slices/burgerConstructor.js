import {createSlice} from '@reduxjs/toolkit';

let lastId = 0;

const initialState = {
  bun: null,
  components: [],
  qty: {}
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, {payload: {ingredient}}) {
      // console.log(arguments);
      if (ingredient.type === 'bun') {
        if (state.bun) { // Удалим информацию о количестве текущих булок
          state.qty[state.bun._id] = 0;
        }

        state.bun = ingredient  // Перезапишем булки
        state.qty[ingredient._id] = 2;
      } else {
        state.components.push({
          id: lastId++,
          ingredient
        });

        state.qty[ingredient._id]
          ? state.qty[ingredient._id] = ++state.qty[ingredient._id]
          : state.qty[ingredient._id] = 1;
      }
    },
    removeIngredient(state, {payload}) {
      let ingredient;
      state.components = state.components.filter((item, index) => {
        if (index === payload.index) {
          ingredient = item.ingredient;
        }
        return index !== payload.index;
      });
      state.qty[ingredient._id] = --state.qty[ingredient._id];
    },
    updateComponentsSort(state, {payload: {fromIndex, toIndex}}) {
      // Получили массив не Proxy-элментов
      const updatedComponents = [...state.components];
      const dragComponent = updatedComponents[fromIndex];
      updatedComponents.splice(fromIndex, 1); // удалили drag-компонент
      updatedComponents.splice(toIndex, 0, dragComponent); // вставили его в drop-место
      // модифицировали массив и вернули его в state.components
      state.components = updatedComponents;
    },
    reset() {
      return initialState;
    }
  },
});
export const {addIngredient, removeIngredient, updateComponentsSort, reset} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
