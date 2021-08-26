import reducer, {
  wsUserConnectionSuccess,
  wsUserConnectionClosed,
  wsUserConnectionError,
  wsUserGetMessage
} from './wsUser';

const initState = {
  orders: [],
  wsConnected: false
}

const initStateConnected = {
  orders: [],
  wsConnected: true
}

describe('Проверка редьюсера wsUser', () => {
  it('Проверка начального состояния', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  })
  it('Проверка редьюсера. wsUserConnectionSuccess', () => {
    expect(reducer(initState, wsUserConnectionSuccess())).toEqual({
      ...initState,
      wsConnected: true
    })
  })
  it('Проверка редьюсера. wsUserConnectionClosed', () => {
    expect(reducer(initStateConnected, wsUserConnectionClosed())).toEqual({
      ...initStateConnected,
      wsConnected: false
    })
  })
  it('Проверка редьюсера. wsUserConnectionError', () => {
    expect(reducer(initStateConnected, wsUserConnectionError())).toEqual({
      ...initStateConnected,
      wsConnected: false
    })
  })
  it('Проверка редьюсера. wsUserGetMessage', () => {
    const mockOrders = {orders: [{id: '1'}, {id: '2'}], total: 123};
    expect(reducer(initStateConnected, wsUserGetMessage(mockOrders))).toEqual({
      ...initStateConnected,
      orders: mockOrders.orders
    })
  })
});
