export const SHOW_INGREDIENT_INFO = 'SHOW_INGREDIENT_INFO';
export const HIDE_INGREDIENT_INFO = 'HIDE_INGREDIENT_INFO';

export const ORDER_CLOSE = 'ORDER_CLOSE';
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';

export function order(orderURL, ingredients) {
  return function(dispatch) {
    dispatch({ type: ORDER_REQUEST });
    fetch(orderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(ingredients)
    })
    .then(response => response.json())
    .then(result => {
      result.success
      ? dispatch({
        type: ORDER_SUCCESS,
        orderNumber: result.order.number
      })
      : dispatch({ type: ORDER_FAILED });
    })
    .catch(err => {
      dispatch({ type: ORDER_FAILED });
    });
  }
}
