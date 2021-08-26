import {createSlice} from '@reduxjs/toolkit';
import {IIngredient} from "../types";
import {AppDispatch} from "../store";

type TBurgerIngredientsState = {
  data: Array<IIngredient>;
  dataRequest: boolean;
  dataFailed: boolean;
  currentTab: string;
};

const initialState: TBurgerIngredientsState = {
  data: [],
  dataRequest: false,
  dataFailed: false,
  currentTab: 'buns'
};

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    request(state) {
      state.dataRequest = true;
      state.dataFailed = false;
    },
    success(state, action) {
      state.dataRequest = false;
      state.data = action.payload.data;
    },
    failed(state) {
      state.dataRequest = false;
      state.dataFailed = true;
    },
    updateCurrentTab(state, {payload}) {
      state.currentTab = payload.tab;
    }
  },
});

export const {request, success, failed, updateCurrentTab} = burgerIngredientsSlice.actions;

const getData = (url: string) => {
  return async function (dispatch: AppDispatch) {
    dispatch(request());
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        dispatch(success({data: result.data}))
      } else {
        dispatch(failed());
      }
    } catch (err) {
      console.log(err);
      dispatch(failed());
    }
  }
}

export {getData};

export default burgerIngredientsSlice.reducer;
