import PropTypes from 'prop-types';

import ingredientDetailsStyles from './IngredientDetails.module.css';

const IngredientDetails = (props) => {
  const {ingredient} = props;
  return (
    <div className={ingredientDetailsStyles.container}>
      <img alt={ingredient.name} src={ingredient.image_large} className='mb-4'></img>
      <div className={ingredientDetailsStyles.description}>
        <h3 className={`${ingredientDetailsStyles.name} text text_type_main-medium mb-8`}>{ingredient.name}</h3>
        <ul className={`${ingredientDetailsStyles['info-list']} text_color_inactive`}>
          <li className={`${ingredientDetailsStyles['info-list-item']}`}>
            <span className={`${ingredientDetailsStyles['nutrition-type-name']} text text_type_main-small`}>Калории, ккал</span>
            <span className="text text_type_digits-default">{ingredient.calories}</span>
          </li>
          <li className={ingredientDetailsStyles['info-list-item']}>
            <span className={`${ingredientDetailsStyles['nutrition-type-name']} text text_type_main-small`}>Белки, г</span>
            <span className="text text_type_digits-default">{ingredient.proteins}</span>
          </li>
          <li className={ingredientDetailsStyles['info-list-item']}>
            <span className={`${ingredientDetailsStyles['nutrition-type-name']} text text_type_main-small`}>Жиры, г</span>
            <span className="text text_type_digits-default">{ingredient.fat}</span>
          </li>
          <li className={ingredientDetailsStyles['info-list-item']}>
            <span className={`${ingredientDetailsStyles['nutrition-type-name']} text text_type_main-small`}>Углеводы, г</span>
            <span className="text text_type_digits-default">{ingredient.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
    }).isRequired
};

export default IngredientDetails;
