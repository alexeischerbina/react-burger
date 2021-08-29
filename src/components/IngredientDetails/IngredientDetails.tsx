import React, {FC} from "react";
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import ingredientDetailsStyles from './IngredientDetails.module.css';
import {getData} from "../../services/slices/burgerIngredients";

import {IIngredient} from "../../services/types";
import {burgerAPI} from "../../services/utils";

const dataURL = `${burgerAPI}/ingredients`;

type TIngredientDetails = {
  className?: string;
  title?: string;
};

const IngredientDetails:FC<TIngredientDetails> = ({ className, title }) => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(({data}) => data);
  const {ingredientId} = useParams<{ ingredientId: string}>();

  if (data.length === 0) {
    dispatch(getData(dataURL));
  }

  const ingredient = data.find((item: IIngredient) => item._id === ingredientId);

  return (
    <div className={`${ingredientDetailsStyles.container} ${className}`}>
      {title && (<h2 className={`text text_type_main-large mr-9`}>
        {title}
      </h2>)}
      {ingredient ? (
          <>
            <img alt={ingredient.name} src={ingredient.image_large} className='mb-4'/>
            <div className={ingredientDetailsStyles.description}>
              <h3 className={`${ingredientDetailsStyles.name} text text_type_main-medium mb-8`}>{ingredient.name}</h3>
              <ul className={`${ingredientDetailsStyles['info-list']} text_color_inactive`}>
                <li className={`${ingredientDetailsStyles['info-list-item']}`}>
                  <span className={`${ingredientDetailsStyles['nutrition-type-name']} text text_type_main-small`}>Калории, ккал</span>
                  <span className="text text_type_digits-default">{ingredient.calories}</span>
                </li>
                <li className={ingredientDetailsStyles['info-list-item']}>
                <span
                  className={`${ingredientDetailsStyles['nutrition-type-name']} text text_type_main-small`}>Белки, г</span>
                  <span className="text text_type_digits-default">{ingredient.proteins}</span>
                </li>
                <li className={ingredientDetailsStyles['info-list-item']}>
                <span
                  className={`${ingredientDetailsStyles['nutrition-type-name']} text text_type_main-small`}>Жиры, г</span>
                  <span className="text text_type_digits-default">{ingredient.fat}</span>
                </li>
                <li className={ingredientDetailsStyles['info-list-item']}>
                <span
                  className={`${ingredientDetailsStyles['nutrition-type-name']} text text_type_main-small`}>Углеводы, г</span>
                  <span className="text text_type_digits-default">{ingredient.carbohydrates}</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
        <span className="text text_type_main-medium mt-10">Загружаем данные... </span>
      )}
    </div>
  );
}

export default IngredientDetails;
