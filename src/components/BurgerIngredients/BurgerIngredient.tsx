import React, {FC} from 'react';
import {useDrag} from 'react-dnd';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientStyles from './BurgerIngredient.module.css';

import {IIngredient} from "../../services/types";

interface IIngredientItem {
  ingredient: IIngredient;
  cnt: number
}

const BurgerIngredient:FC<IIngredientItem> = ({ingredient, cnt}) => {
  const {image_large, name, price} = ingredient;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {ingredient}
  });

  return (
    <div className={burgerIngredientStyles["burger-ingredient"]} ref={dragRef}>
      {cnt ? <div className={burgerIngredientStyles["burger-ingredient-cnt"]}><Counter count={cnt} size="default"/></div> : null}
      <img src={image_large} alt={name} className={`${burgerIngredientStyles["burger-ingredient-img"]} pr-4 pl-4`}/>
      <div className={burgerIngredientStyles["burger-ingredient-price"]}>
        <span className={"text text_type_digits-default"}>{price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <span className={`${burgerIngredientStyles["burger-ingredient-name"]} text text_type_main-default`}>{name}</span>
    </div>
  );
}

export default React.memo(BurgerIngredient);
