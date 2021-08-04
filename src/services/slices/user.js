import {createSlice} from '@reduxjs/toolkit';
import {deleteCookie, getCookie, setCookie} from "../utils";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isRequest: false,
    isFailed: false,
    isAuth: !!getCookie('accessToken')
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
    failed(state) {
      state.isRequest = false;
      state.isFailed = true;
    }
  }
});

const {request, success, failed} = userSlice.actions;

export default userSlice.reducer;

export function register({password, name, email}) {
  return function (dispatch) {
    dispatch(request());
    fetch('https://norma.nomoreparties.space/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        name,
        email
      })
    }).then(response => response.json())
      .then(result => {
        if (result.success) {
          dispatch(success({isAuth: true}));
          setCookie('accessToken', result.accessToken, {expires: 20 * 60});
          setCookie('refreshToken', result.refreshToken);
        } else {
          dispatch(failed());
        }
      })
      .catch(err => {
        dispatch(failed());
      })
  }
}

export function login({password, email}) {
  return function (dispatch) {
    dispatch(request());
    fetch('https://norma.nomoreparties.space/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        email
      })
    }).then(response => response.json())
      .then((result) => {
        if (result.success) {
          dispatch(success({isAuth: true}));
          setCookie('accessToken', result.accessToken, {expires: 20 * 60});
          setCookie('refreshToken', result.refreshToken);
        } else {
          dispatch(failed());
        }
      })
      .catch(err => {
        dispatch(failed());
      });
  }
}

export function logout() {
  return function (dispatch) {
    dispatch(request());
    fetch('https://norma.nomoreparties.space/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
    }).then(response => response.json())
      .then(result => {
        if (result.success) {
          dispatch(success({isAuth: false}))
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
          // history.replace('/');
        } else {
          dispatch(failed());
        }
      })
      .catch(err => {
        dispatch(failed());
      })
  }
}

export async function token() {
  // return async function(dispatch) {
  // dispatch(request());
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
    const {success, accessToken, refreshToken} = await response.json();
    if (success) {
      setCookie('accessToken', accessToken, {expires: 20 * 60});
      setCookie('refreshToken', refreshToken);
    } else {
      // dispatch(failed());
      console.log('Ошибка при обновлении токена');
    }
  } catch (e) {
    // dispatch(failed());
    console.log('Ошибка при обновлении токена');
  }
  // }
}
