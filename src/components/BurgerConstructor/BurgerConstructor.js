import React, { useCallback } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { showIngredientInfo, order } from '../../services/slices/index';
import { updateComponentsSort } from '../../services/slices/burgerConstructor';

import BurgerConstructorItem from './BurgerConstructorItem';

const orderURL = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, components } = useSelector(state => state.ingredients);

  const total = (components.length ?  components.reduce((sum, { ingredient }) => sum + ingredient.price, 0) : 0) + (bun ?  bun.price * 2 : 0);

  const handleOpenModal = (ingredient) => {
    return () => {
      dispatch(showIngredientInfo({ ingredient }));
    }
  };

  const handleOpenOrderModal = async () => {
    const ingredients = {
      ingredients: [bun._id]
    };

    components.forEach(ingredient => {
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
      {bun && (<div className="pl-8" onClick={handleOpenModal(bun)}>
          <ConstructorElement
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                  isLocked={true}
                  type={'top'}
          />
        </div>
      )}
      <ul className={`${burgerConstructorStyles["burger-constructor-list"]} pr-2`}>
        {components.map((item, index) => (
          <li key={item.id}>
            <BurgerConstructorItem ingredient={item.ingredient} index={index} moveComponent={moveComponent} />
          </li>
        ))}
      </ul>
      {bun && (<div className="pl-8 mb-10" onClick={handleOpenModal(bun)}>
          <ConstructorElement
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                  isLocked={true}
                  type={'bottom'}
          />
        </div>
      )}
      <div className={`${burgerConstructorStyles["burger-constructor-summary-and-offer-btn"]} pr-4`}>
        <div className={`${burgerConstructorStyles['burger-constructor-summary']} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{total}</p>
          <CurrencyIcon type="primary" />
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
