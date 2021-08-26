import {createSlice} from '@reduxjs/toolkit';
import {deleteCookie, getCookie, setCookie} from "../utils";
import {AppDispatch} from "../store";

type TUserState = {
  isRequest: boolean;
  isFailed: boolean;
  isAuth: boolean;
  name: string;
  form: {
    name: string;
    email: string;
    password: string
  }
};

const initialState: TUserState = {
  isRequest: false,
  isFailed: false,
  isAuth: !!getCookie('accessToken'),
  name: '',
  form: {
    name: '',
    email: '',
    password: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    request(state) {
      state.isRequest = true;
      state.isFailed = false;
    },
    success(state, {payload: {isAuth}}) {
      state.isRequest = false;
      state.isAuth = isAuth;
    },
    setUserName(state, {payload: {name}}) {
      state.name = name;
    },
    failed(state) {
      state.isRequest = false;
      state.isFailed = true;
    },
    setUserFormData(state, {payload: {name, email}}) {
      state.form.name = name;
      state.form.email = email;
    },// PayloadAction<{[key in TFormKey]: string}>
    updateUserFormData(state, {payload}) {
      for (const key in payload) {
        if (key === 'name' || key === 'email' || key === 'password') {
          state.form[key] = payload[key];
        } else {
          console.log(`Поля ${key} не существует в состоянии формы`);
        }
      }
    }
  }
});

export const {request, success, failed, setUserName, setUserFormData, updateUserFormData} = userSlice.actions;

export default userSlice.reducer;

type TRegisterFormFields = {
  password: string;
  name: string;
  email: string;
}

const register = ({password, name, email}: TRegisterFormFields) => {
  return async function (dispatch: AppDispatch) {
    dispatch(request());
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          name,
          email
        })
      });
      const result = await response.json();
      if (result.success) {
        setCookie('accessToken', result.accessToken.slice(7), {expires: 20 * 60});
        setCookie('refreshToken', result.refreshToken);
        dispatch(success({isAuth: true}));
        dispatch(setUserName({name: result.user.name}));
      } else {
        dispatch(failed());
      }
    } catch (err) {
      console.log(err);
      dispatch(failed());
    }
  }
}

type TLoginFormFields = Omit<TRegisterFormFields, 'name'>;

const login = ({password, email}:TLoginFormFields) => {
  return async function (dispatch: AppDispatch) {
    dispatch(request());
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          email
        })
      });
      const result = await response.json();
      if (result.success) {
        setCookie('accessToken', result.accessToken.slice(7), {expires: 20 * 60});
        setCookie('refreshToken', result.refreshToken);
        dispatch(success({isAuth: true}));
        dispatch(setUserName({name: result.user.name}));
      } else {
        dispatch(failed());
      }
    } catch (err) {
      console.log(err);
      dispatch(failed());
    }
  }
}

const logout = () => {
  return async function (dispatch:AppDispatch) {
    dispatch(request());
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: getCookie('refreshToken')
        })
      });
      const result = await response.json();
      if (result.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(success({isAuth: false}));
        dispatch(setUserName({name: null}))
      } else {
        dispatch(failed());
      }
    } catch (err) {
      console.log(err);
      dispatch(failed());
    }
  }
}

const token = () => {
  return async function (dispatch:AppDispatch) {
    dispatch(request());
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: getCookie('refreshToken')
        })
      });
      const result = await response.json();
      const {accessToken, refreshToken} = result;
      if (result.success) {
        setCookie('accessToken', accessToken.slice(7), {expires: 20 * 60});
        setCookie('refreshToken', refreshToken);
        dispatch(success({isAuth: true}))
      } else {
        deleteCookie('accessToken');
        dispatch(success({isAuth: false}));
        dispatch(setUserName({name: null}));
        dispatch(failed());
        console.log('Ошибка при обновлении токена');
      }
    } catch (e) {
      deleteCookie('accessToken');
      dispatch(success({isAuth: false}));
      dispatch(setUserName({name: null}));
      dispatch(failed());
      console.log('Ошибка при обновлении токена');
    }
  }
}

const updateUserName = () => {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + getCookie('accessToken')
        }
      });
      const result = await response.json();
      if (result.success) {
        dispatch(setUserName({name: result.user.name}));
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const getUserData: any = () => {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + getCookie('accessToken')
        }
      });
      const result = await response.json();
      if (result.success) {
        // dispatch(setUserName({userName: result.user.name}));
        dispatch(setUserFormData({
          name: result.user.name,
          email: result.user.email
        }));
        dispatch(setUserName({name: result.user.name}));
        // setFormData({...formData, ...result.user});
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const setUserData: any = (formData: TRegisterFormFields) => {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({...formData})
      });
      const result = await response.json();
      if (result.success) {
        // dispatch(setUserName({name: result.user.name}));
        dispatch(setUserFormData({
          name: result.user.name,
          email: result.user.email
        }));
        dispatch(setUserName({name: result.user.name}));
        console.log('Данные успешно сохранены');
      } else {
        console.log('Произошла ошибка');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export {logout, login, register, token, updateUserName, getUserData, setUserData};