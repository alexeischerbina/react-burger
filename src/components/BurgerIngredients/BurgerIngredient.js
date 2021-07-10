import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
// import { showIngredientInfo } from '../../services/slices/index';
// import { addIngredient } from '../../services/slices/burgerConstructor';
import { useDrag } from 'react-dnd';


/* ПЕРЕДЕЛАТЬ! */
import burgerIngredientsStyles from './BurgerIngredients.module.css';

function BurgerIngredient(props) {
  const { ingredient } = props;
  const { image_large, name, price } = ingredient;

  const components = useSelector(state => state.ingredients);

    const [, dragRef] = useDrag({
      type: 'ingredient',
      item: { ingredient },
      // collect: monitor => ({
      //   opacity: monitor.isDragging() ? 0.5 : 1
      // })
    });

  const getIngredientCount = (ingredient) => {
    if (ingredient.type === 'bun') {
      if (components.bun && ingredient._id === components.bun._id) {
        return 1;
      } else {
        return 0;
      }
    }
    return components.components.reduce((count, item) => count + (item._id === ingredient._id ? 1 : 0), 0);
  }

  const cnt = getIngredientCount(ingredient);

  return (
    <>
      {cnt ? <Counter count={cnt} size="default" className={burgerIngredientsStyles["burger-ingredients-item-cnt"]} /> : null}
      <img src={image_large} alt={name} className={`${burgerIngredientsStyles["burger-ingredients-item-img"]} pr-4 pl-4`} ref={dragRef} />
      <div className={burgerIngredientsStyles["burger-ingredients-item-price"]}>
        <span className={"text text_type_digits-default"}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`${burgerIngredientsStyles["burger-ingredients-item-name"]} text text_type_main-default`}>{name}</span>
    </>
  );
}

export default BurgerIngredient;
