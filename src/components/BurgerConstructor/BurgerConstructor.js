import React from 'react';
// import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { SHOW_INGREDIENT_INFO, order } from '../../services/actions/index';
import { BURGER_CONSTRUCTOR_DELETE } from '../../services/actions/burgerConstructor';

const orderURL = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, components } = useSelector(state => state.ingredients);

  const total = (components.length ?  components.reduce((sum, cur) => sum + cur.price, 0) : 0) + (bun ?  bun.price * 2 : 0);

  const handleOpenModal = (ingredient) => {
    return () => {
      dispatch({
        type: SHOW_INGREDIENT_INFO,
        ingredient
      });
    }
  };

  const handleOpenOrderModal = async () => {
    const ingredients = {
      ingredients: [bun._id]
    };

    components.forEach(ingredient => {
      ingredients.ingredients.push(ingredient._id);
    });

    dispatch(order(orderURL, ingredients));
  }

  const handleRemoveIngredient = (index) => {
    return (e) => {
      e.stopPropagation();
      dispatch({
        type: BURGER_CONSTRUCTOR_DELETE,
        index
      });
    };
  }

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
          <li className={burgerConstructorStyles["burger-constructor-list-item"]} key={item._id + index}>
            <DragIcon type="primary"/>
            <div className={burgerConstructorStyles["burger-constructor-list-item-inner"]} onClick={handleOpenModal(item)}>
              <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={handleRemoveIngredient(index)}
              />
            </div>
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

// const dataPropType = PropTypes.shape({
//   _id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   type: PropTypes.oneOf(['bun', 'sauce', 'main']),
//   proteins: PropTypes.number.isRequired,
//   fat: PropTypes.number.isRequired,
//   carbohydrates: PropTypes.number.isRequired,
//   calories: PropTypes.number.isRequired,
//   price: PropTypes.number.isRequired,
//   image: PropTypes.string.isRequired,
//   image_mobile: PropTypes.string.isRequired,
//   image_large: PropTypes.string.isRequired,
//   __v: PropTypes.number.isRequired
// });

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(dataPropType.isRequired)
// };

export default BurgerConstructor;
