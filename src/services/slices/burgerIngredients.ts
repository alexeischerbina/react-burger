import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IIngredient} from "../types";

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

const getData = createAsyncThunk(
    'burgerIngredients/getData',
    async (url: string, {dispatch}) => {
        dispatch(request());
        const response = await fetch(url);
        const result = await response.json();
        if (result.success) {
            dispatch(success({data: result.data}))
        } else {
            dispatch(failed());
        }
    }
)

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
  extraReducers: (builder) => {
    builder.addCase(getData.rejected, (state, action) => {
        console.log(action.error);
        failed();
      }
    )
  }
});

export const {request, success, failed, updateCurrentTab} = burgerIngredientsSlice.actions;

export {getData};

export default burgerIngredientsSlice.reducer;
