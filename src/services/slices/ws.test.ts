import reducer, {wsConnectionSuccess, wsConnectionClosed, wsConnectionError, wsGetMessage} from './ws';

const initState = {
  orders: {},
  wsConnected: false
}

const initStateConnected = {
  orders: {},
  wsConnected: true
}

describe('Проверка редьюсера ws', () => {
  it('Проверка начального состояния', () => {
    expect(reducer(undefined, {type: 'test'})).toEqual(initState);
  })
  it('Проверка редьюсера. wsConnectionSuccess', () => {
    expect(reducer(initState, wsConnectionSuccess())).toEqual({
      ...initState,
      wsConnected: true
    })
  })
  it('Проверка редьюсера. wsConnectionClosed', () => {
    expect(reducer(initStateConnected, wsConnectionClosed())).toEqual({
      ...initStateConnected,
      wsConnected: false
    })
  })
  it('Проверка редьюсера. wsConnectionError', () => {
    expect(reducer(initStateConnected, wsConnectionError())).toEqual({
      ...initStateConnected,
      wsConnected: false
    })
  })
  it('Проверка редьюсера. wsGetMessage', () => {
    const mockOrders = {orders: [{id: '1'}, {id: '2'}], total: 123};
    expect(reducer(initStateConnected, wsGetMessage(mockOrders))).toEqual({
      ...initStateConnected,
      orders: mockOrders
    })
  })
});
