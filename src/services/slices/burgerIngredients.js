import { createSlice } from '@reduxjs/toolkit';

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
    updateCurrentTab(state, { payload }) {
      state.currentTab = payload.tab;
    }
  },
});

const { request, success, failed, updateCurrentTab } = burgerIngredientsSlice.actions;

export { updateCurrentTab };

export function getData(url) {
  return function(dispatch) {
    dispatch(request());
    fetch(url)
      .then(response => response.json())
      .then(result => {
          result.success
              ? dispatch(success({ data: result.data }))
              : dispatch(failed());
    }).catch(err => {
      dispatch(failed());
    })
  }
}

export default burgerIngredientsSlice.reducer;
