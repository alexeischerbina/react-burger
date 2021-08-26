import {orderReducer, orderClose, orderRequest, orderSuccess, orderFailed, order, IOrderState} from './index';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {reset} from './burgerConstructor';
import {AppDispatch} from "../store";



const initState:IOrderState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false
}

const initStateOrderNumber:IOrderState = {
  orderNumber: 12345,
  orderRequest: false,
  orderFailed: false
}

const initStateOrderRequest: IOrderState = {
  orderNumber: null,
  orderRequest: true,
  orderFailed: false
}

afterEach(() => {
  fetchMock.reset()
  fetchMock.restore()
})

describe('Проверка редьюсера orderReducer', () => {
  it('Проверка начального состояния', () => {
    expect(orderReducer(undefined, {type: 'test'})).toEqual(initState);
  })
  it('Проверка редьюсера. orderClose', () => {
    expect(orderReducer(initStateOrderNumber, orderClose())).toEqual(initState)
  })
  it('Проверка редьюсера. orderRequest', () => {
    expect(orderReducer(initState, orderRequest())).toEqual({
      ...initState,
      orderRequest: true
    })
  })
  it('Проверка редьюсера. orderSuccess', () => {
    expect(orderReducer(initStateOrderRequest, orderSuccess({orderNumber: 123}))).toEqual({
      ...initStateOrderRequest,
      orderRequest: false,
      orderNumber: 123
    })
  })
  it('Проверка редьюсера. orderFailed', () => {
    expect(orderReducer(initStateOrderRequest, orderFailed())).toEqual({
      ...initStateOrderRequest,
      orderRequest: false,
      orderFailed: true
    })
  })

  it('Проверка асинхронного запроса order', () => {
    const mockResponse = {order: {number: 12345}};
    fetchMock.post(`orderTestUrl`, {
      headers: {'content-type': 'application/json'},
      body: {...mockResponse, success: true},
    })
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore(initState);
    const dispatch = store.dispatch as AppDispatch;
    dispatch(order('orderTestUrl', {ingredients: []})).then(() => {
      expect(store.getActions()).toEqual([
        orderRequest(),
        orderSuccess({orderNumber: mockResponse.order.number}),
        reset()
      ])
    }).catch((err: string) => {
      console.log(err);
    })
  })
});
