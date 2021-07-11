import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

import burgerIngredientStyles from './BurgerIngredient.module.css';

function BurgerIngredient(props) {
  const { ingredient } = props;
  const { image_large, name, price } = ingredient;

  const components = useSelector(state => state.ingredients);

    const [, dragRef] = useDrag({
      type: 'ingredient',
      item: { ingredient }
    });

  const getIngredientCount = (ingredient) => {
    if (ingredient.type === 'bun') {
      if (components.bun && ingredient._id === components.bun._id) {
        return 2;
      } else {
        return 0;
      }
    }
    return components.components.reduce((count, item) => count + (item.ingredient._id === ingredient._id ? 1 : 0), 0);
  }

  const cnt = getIngredientCount(ingredient);

  return (
    <div className={burgerIngredientStyles["burger-ingredient"]} ref={dragRef}>
      {cnt ? <Counter count={cnt} size="default" className={burgerIngredientStyles["burger-ingredient-cnt"]} /> : null}
      <img src={image_large} alt={name} className={`${burgerIngredientStyles["burger-ingredient-img"]} pr-4 pl-4`} />
      <div className={burgerIngredientStyles["burger-ingredient-price"]}>
        <span className={"text text_type_digits-default"}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`${burgerIngredientStyles["burger-ingredient-name"]} text text_type_main-default`}>{name}</span>
    </div>
  );
}

const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'sauce', 'main']),
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired
};

export default BurgerIngredient;
