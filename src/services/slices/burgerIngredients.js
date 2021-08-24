import {createSlice} from '@reduxjs/toolkit';

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState: {
    data: [],
    dataRequest: false,
    dataFailed: false,
    currentTab: 'buns'
  },
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

export function getData(url) {
  return async function (dispatch) {
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

export default burgerIngredientsSlice.reducer;
