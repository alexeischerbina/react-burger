import React, {useCallback} from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import {order} from '../../services/slices';
import {updateComponentsSort} from '../../services/slices/burgerConstructor';
import {BurgerConstructorItem} from './BurgerConstructorItem';

import burgerConstructorStyles from './BurgerConstructor.module.css';

import {IIngredient} from '../../services/types';

export interface IIngredientComponent {
  ingredient: IIngredient,
  id: number
}

const orderURL = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const {bun, components} = useAppSelector(({ingredients}) => ingredients);
  const {isAuth} = useAppSelector(({user}) => user);

  const total = (components.length ? components.reduce((sum: number, {ingredient} : IIngredientComponent) => sum + ingredient.price, 0) : 0) + (bun ? bun.price * 2 : 0);

  const handleOpenOrderModal = async () => {
    if (!isAuth) {
      history.push('/login');
      return;
    }
    if (bun === null) {
      console.log('Заказать можно только с выбранной булкой');
      return;
    }
    const ingredients = {
      ingredients: [bun._id]
    };

    components.forEach((ingredient: IIngredientComponent) => {
      ingredients.ingredients.push(ingredient.ingredient._id);
    });

    // Добавляем вторую булку в конец нашего бургера
    ingredients.ingredients.push(bun._id);

    dispatch(order(orderURL, ingredients));
  }

  const moveComponent = useCallback((dragIndex, hoverIndex) => {
    dispatch(updateComponentsSort({
      fromIndex: dragIndex,
      toIndex: hoverIndex
    }));
  }, [dispatch]);

  return (
    <div className={`${burgerConstructorStyles["burger-constructor"]} pl-4 pb-15`}>
      {bun && (
        <Link to={{
          pathname: `/ingredients/${bun._id}`,
          state: {background: location}
        }}>
          <div className="pl-8">
            <ConstructorElement
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              isLocked={true}
              type={'top'}
            />
          </div>
        </Link>
      )}
      <ul className={`${burgerConstructorStyles["burger-constructor-list"]} pr-2`}>
        {components.map((item: IIngredientComponent, index: number) => (
          <li key={item.id}>
            <BurgerConstructorItem ingredient={item.ingredient} index={index} moveComponent={moveComponent}/>
          </li>
        ))}
      </ul>
      {bun && (<div className="pl-8 mb-10">
          <Link to={{
            pathname: `/ingredients/${bun._id}`,
            state: {background: location}
          }}>
            <ConstructorElement
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              isLocked={true}
              type={'bottom'}
            />
          </Link>
        </div>
      )}
      <div className={`${burgerConstructorStyles["burger-constructor-summary-and-offer-btn"]} pr-4`}>
        <div className={`${burgerConstructorStyles['burger-constructor-summary']} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{total}</p>
          <CurrencyIcon type="primary"/>
        </div>
        {bun && (<Button type="primary" size="large" onClick={handleOpenOrderModal}>
            Оформить
          </Button>
        )}
      </div>
    </div>
  );
}

export default BurgerConstructor;
