import {createSlice} from '@reduxjs/toolkit';
import {deleteCookie, getCookie, setCookie} from "../utils";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isRequest: false,
    isFailed: false,
    isAuth: !!getCookie('accessToken'),
    name: '',
    form: {
      name: '',
      email: '',
      password: ''
    }
  },
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
    },
    updateUserFormData(state, {payload}) {
      for (const key in payload) {
        state.form[key] = payload[key];
      }
    }
  }
});

export const {request, success, failed, setUserName, setUserFormData, updateUserFormData} = userSlice.actions;

export default userSlice.reducer;

export function register({password, name, email}) {
  return async function (dispatch) {
    dispatch(request());
    try {
      const resposne = await fetch('https://norma.nomoreparties.space/api/auth/register', {
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
      const result = await resposne.json();
      if (result.success) {
        setCookie('accessToken', result.accessToken, {expires: 20 * 60});
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

export function login({password, email}) {
  return async function (dispatch) {
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
        setCookie('accessToken', result.accessToken, {expires: 20 * 60});
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

export function logout() {
  return async function (dispatch) {
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

export function token() {
  return async function (dispatch) {
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
        setCookie('accessToken', accessToken, {expires: 20 * 60});
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

export function updateUserName() {
  return async function (dispatch) {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': getCookie('accessToken')
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

export function getUserData() {
  return async function (dispatch) {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': getCookie('accessToken')
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

export function setUserData(formData) {
  return async function (dispatch) {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': getCookie('accessToken')
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