import React from 'react';
import {useLocation, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {getData} from "../../services/slices/burgerIngredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const dataURL = 'https://norma.nomoreparties.space/api/ingredients';

export default function ProtectedIngredientRoute({children, ...rest}) {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const ingredientId = pathname.split('/').pop();
  const {currentIngredient} = useSelector(({currentIngredient}) => currentIngredient);

  const {data, dataRequest, dataFailed} = useSelector(({data}) => data);

  React.useEffect(() => {
    dispatch(getData(dataURL));
  }, [dispatch]);

  let ingredient = null;
  if (data) {
    ingredient = data.find((ingredient) => ingredient._id === ingredientId);
  }

  return (
    <Route
      {...rest}
      render={() => currentIngredient ? (
        children
      ) : (
        data.length === 0 || dataRequest ? <span className="text text_type_main-medium">Загружаем данные...</span>
          : dataFailed ? <span className="text text_type_main-medium">Произошла ошибка при загрузке :( </span>
            : ingredient ? <IngredientDetails ingredient={ingredient} className="mt-30" title={"Детали ингредиента"}/>
              : <span className="text text_type_main-medium">Ингредиент не найден </span>
      )}
    />
  );

}
