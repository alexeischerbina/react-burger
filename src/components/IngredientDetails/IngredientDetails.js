import React from "react";
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import ingredientDetailsStyles from './IngredientDetails.module.css';
import {getData} from "../../services/slices/burgerIngredients";

const dataURL = 'https://norma.nomoreparties.space/api/ingredients';

const IngredientDetails = ({ className, title }) => {

  const dispatch = useDispatch();
  const {data} = useSelector(({data}) => data);
  const {ingredientId} = useParams();

  if (data.length === 0) {
    dispatch(getData(dataURL));
  }

  const ingredient = data.find(item => item._id === ingredientId);

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

IngredientDetails.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string
};

export default IngredientDetails;
