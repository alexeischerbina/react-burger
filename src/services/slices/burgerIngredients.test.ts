import reducer, {request, success, failed, updateCurrentTab, getData} from './burgerIngredients';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {AppDispatch} from "../store";

const initState = {
  data: [],
  dataRequest: false,
  dataFailed: false,
  currentTab: 'buns'
}

const fakeData = [{
  test: 'test'
}, {
  test: 'test2'
}]

afterEach(() => {
  fetchMock.reset()
  fetchMock.restore()
})

describe('Проверка редьюсера burgerIngredients', () => {
  it('Проверка начального состояния', () => {
    expect(reducer(undefined, {type: 'test'})).toEqual(initState);
  })
  it('Проверка редьюсера. Request', () => {
    expect(reducer(undefined, request())).toEqual({
      data: [],
      dataRequest: true,
      dataFailed: false,
      currentTab: 'buns'
    })
  })
  it('Проверка редьюсера. Success', () => {
    expect(reducer(undefined, success({data: fakeData}))).toEqual({
      data: fakeData,
      dataRequest: false,
      dataFailed: false,
      currentTab: 'buns'
    })
  })
  it('Проверка редьюсера. Failed', () => {
    expect(reducer(undefined, failed())).toEqual({
      data: [],
      dataRequest: false,
      dataFailed: true,
      currentTab: 'buns'
    })
  })
  it('Проверка редьюсера. updateCurrentTab', () => {
    expect(reducer(undefined, updateCurrentTab({tab: 'main'}))).toEqual({
      data: [],
      dataRequest: false,
      dataFailed: false,
      currentTab: 'main'
    })
  })

  it('Проверка асинхронного запроса getData', () => {
    const mockResponse = [{test: 1}, {test: 2}, {test: 3}];
    fetchMock.getOnce(`testUrl`, {
      headers: {'content-type': 'application/json'},
      body: {data: mockResponse, success: true},
    })
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore(initState);
    const dispatch = store.dispatch as AppDispatch;
    dispatch(getData('testUrl')).then(() => {
      expect(store.getActions()).toEqual([
        request(),
        success({data: mockResponse})
      ])
    }).catch((err: string) => {
      console.log(err);
    })
  })
});
