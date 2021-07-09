export const BURGER_INGREDIENTS_REQUEST = 'BURGER_INGREDIENTS_REQUEST';
export const BURGER_INGREDIENTS_SUCCESS = 'BURGER_INGREDIENTS_SUCCESS';
export const BURGER_INGREDIENTS_FAILED = 'BURGER_INGREDIENTS_FAILED';

export function getData(url) {
  return function(dispatch) {
    dispatch({
      type: BURGER_INGREDIENTS_REQUEST
    });
    fetch(url)
      .then(response => response.json())
      .then(result => {
          result.success
              ? dispatch({
                type: BURGER_INGREDIENTS_SUCCESS,
                data: result.data
              })
              : dispatch({ type: BURGER_INGREDIENTS_FAILED });
    }).catch(err => {
      dispatch({ type: BURGER_INGREDIENTS_FAILED });
    })
  }
}
