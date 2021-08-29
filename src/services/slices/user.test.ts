import reducer, {
  request, success, failed, setUserName,
  setUserFormData, updateUserFormData,
  register, login, logout, token,
  updateUserName, getUserData, setUserData
} from './user';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {AppDispatch} from "../store";
import {burgerAPI} from "../utils";

const initState = {
  isRequest: false,
  isFailed: false,
  isAuth: false,
  name: '',
  form: {
    name: '',
    email: '',
    password: ''
  }
}

const initStateRequest = {
  isRequest: true,
  isFailed: false,
  isAuth: false,
  name: '',
  form: {
    name: '',
    email: '',
    password: ''
  }
}

const initStataFormData = {
  isRequest: false,
  isFailed: false,
  isAuth: true,
  name: 'Test name',
  form: {
    name: 'Test name',
    email: 'Test email',
    password: '123'
  }
}

afterEach(() => {
  fetchMock.reset()
  fetchMock.restore()
})

describe('Проверка редьюсера userReducer', () => {
  it('Проверка начального состояния', () => {
    expect(reducer(undefined, {type: 'test'})).toEqual(initState);
  })
  it('Проверка редьюсера. Request', () => {
    expect(reducer(initState, request())).toEqual({
      ...initState,
      isRequest: true
    })
  })
  it('Проверка редьюсера. Success', () => {
    expect(reducer(initStateRequest, success({isAuth: true}))).toEqual({
      ...initStateRequest,
      isRequest: false,
      isAuth: true,
    })
  })
  it('Проверка редьюсера. Failed', () => {
    expect(reducer(initStateRequest, failed())).toEqual({
      ...initStateRequest,
      isRequest: false,
      isFailed: true
    })
  })
  it('Проверка редьюсера. setUserName', () => {
    expect(reducer(initState, setUserName({name: 'testName'}))).toEqual({
      ...initState,
      name: 'testName'
    })
  })
  it('Проверка редьюсера. setUserFormData', () => {
    expect(reducer(initStataFormData, setUserFormData({
      name: 'Another testName',
      email: 'Another testEmail'
    }))).toEqual({
      ...initStataFormData,
      form: {
        ...initStataFormData.form,
        name: 'Another testName',
        email: 'Another testEmail'
      }
    })
  })
  it('Проверка редьюсера. updateUserFormData', () => {
    expect(reducer(initStataFormData, updateUserFormData({name: 'Another testName'}))).toEqual({
      ...initStataFormData,
      form: {
        ...initStataFormData.form,
        name: 'Another testName'
      }
    })
  })

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it('Проверка асинхронного запроса register', () => {
    const mockParams = {
      password: '123',
      name: 'Test name',
      email: 'Test email'
    };
    const mockResponse = {
      accessToken: '123',
      refreshToken: '456',
      user: {name: mockParams.name},
      success: true
    };
    fetchMock.post(`${burgerAPI}/auth/register`, {
      headers: {'content-type': 'application/json'},
      body: mockResponse
    })
    const store = mockStore(initState);
    const dispatch = store.dispatch as AppDispatch;
    dispatch(register(mockParams)).then(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining([
        request(),
        success({isAuth: true}),
        setUserName({name: mockResponse.user.name})
      ]))
    }).catch((err: string) => {
      console.log(err);
    })
  })
  it('Проверка асинхронного запроса login', () => {
    const mockParams = {
      password: '123',
      email: 'Test email',
      name: 'Test name'
    };
    const mockResponse = {
      accessToken: '123',
      refreshToken: '456',
      user: {name: mockParams.name},
      success: true
    };
    fetchMock.post(`${burgerAPI}/auth/login`, {
      headers: {'content-type': 'application/json'},
      body: mockResponse
    })
    const store = mockStore(initState);
    const dispatch = store.dispatch as AppDispatch;
    dispatch(login(mockParams)).then(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining([
        request(),
        success({isAuth: true}),
        setUserName({name: mockResponse.user.name})
      ]))
    }).catch((err: string) => {
      console.log(err);
    })
  })
  it('Проверка асинхронного запроса logout', () => {
    fetchMock.post(`${burgerAPI}/auth/logout`, {
      headers: {'content-type': 'application/json'},
      body: {success: true}
    })
    const store = mockStore(initState);
    const dispatch = store.dispatch as AppDispatch;
    dispatch(logout()).then(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining([
        request(),
        success({isAuth: false}),
        setUserName({name: null})
      ]))
    }).catch((err: string) => {
      console.log(err);
    })
  })
  it('Проверка асинхронного запроса token', () => {
    fetchMock.post(`${burgerAPI}/auth/token`, {
      headers: {'content-type': 'application/json'},
      body: {success: true, accessToken: 'Test accessToken', refreshToken: 'Test refreshToken'}
    })
    const store = mockStore(initState);
    const dispatch = store.dispatch as AppDispatch;
    dispatch(token()).then(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining([
        request(),
        success({isAuth: true})
      ]))
    }).catch((err: string) => {
      console.log(err);
    })
  })
  it('Проверка асинхронного запроса updateUserName', () => {
    const mockResponse = {user: {name: 'Test name updateUserName'}};
    fetchMock.getOnce(`${burgerAPI}/auth/user`, {
      headers: {'content-type': 'application/json'},
      body: {success: true, ...mockResponse},
    })
    const store = mockStore(initState);
    const dispatch = store.dispatch as AppDispatch;
    dispatch(updateUserName()).then(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining([
        setUserName({name: mockResponse.user.name})
      ]))
    }).catch((err: string) => {
      console.log(err);
    })
  })
  it('Проверка асинхронного запроса getUserData', () => {
    const mockResponse = {user: {name: 'Test name getUserData', email: 'Test email getUserData'}};
    fetchMock.getOnce(`${burgerAPI}/auth/user`, {
      headers: {'content-type': 'application/json'},
      body: {success: true, ...mockResponse},
    })
    const store = mockStore(initState);
    const dispatch = store.dispatch as AppDispatch;
    dispatch(getUserData()).then(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining([
        setUserFormData({name: mockResponse.user.name, email: mockResponse.user.email}),
        setUserName({name: mockResponse.user.name})
      ]))
    }).catch((err: string) => {
      console.log(err);
    })
  })
  it('Проверка асинхронного запроса setUserData', () => {
    const mockParams = {name: 'Test name setUserData', email: 'Test email setUserData', password: '123'};
    const mockResponse = {user: {name: mockParams.name, email: mockParams.email}};
    fetchMock.patch(`${burgerAPI}/auth/user`, {
      headers: {'content-type': 'application/json'},
      body: {success: true, ...mockResponse},
    })
    const store = mockStore(initState);
    const dispatch = store.dispatch as AppDispatch;
    dispatch(setUserData(mockParams)).then(() => {

      expect(store.getActions()).toEqual(expect.arrayContaining([
        setUserFormData({name: mockResponse.user.name, email: mockResponse.user.email}),
        setUserName({name: mockResponse.user.name})
      ]))
    }).catch((err: string) => {
      console.log(err);
    })
  })
  // deleteCookie('accessToken');
});
