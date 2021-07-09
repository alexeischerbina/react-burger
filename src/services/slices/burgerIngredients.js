import { createSlice } from '@reduxjs/toolkit';

const burgerIngredientsSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    data: [],
    dataRequest: false,
    dataFailed: false
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
    }
  },
});

const { request, success, failed } = burgerIngredientsSlice.actions;

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
