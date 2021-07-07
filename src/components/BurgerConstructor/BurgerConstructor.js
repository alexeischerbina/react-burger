import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import burgerConstructorStyles from './BurgerConstructor.module.css';

import { BurgerComponentsContext } from '../../services/BurgerContext';

const orderURL = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {
  const { components, componentsDispatcher } = useContext(BurgerComponentsContext);

  const innerComponents = components.components;
  const bun = components.bun;
  const total = (innerComponents.length ?  innerComponents.reduce((sum, cur) => sum + cur.price, 0) : 0) + (bun ?  bun.price * 2 : 0);

  const [isShowIngredientInfo, setIsShowIngredientInfo] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);

  const [isShowOrderInfo, setIsShowOrderInfo] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(null);

  const handleOpenModal = (ingredient) => {
    return () => {
      setSelectedIngredient(ingredient);
      setIsShowIngredientInfo(true);
    }
  };

  const handleCloseModal = () => {
    setIsShowIngredientInfo(false);
  }

  const handleOpenOrderModal = async () => {
    const ingredients = {
      ingredients: [components.bun._id]
    };

    components.components.forEach(ingredient => {
      ingredients.ingredients.push(ingredient._id);
    });

    try {
      const response = await fetch(orderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(ingredients)
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(`Ошибка обработки запроса: ${result}`);
      }
      setOrderNumber(result.order.number);
      setIsShowOrderInfo(true);
    } catch(e) {
      console.log(e);
    }
  }

  const handleCloseOrderModal = () => {
    setIsShowOrderInfo(false);
  }

  const handleRemoveIngredient = (index) => {
    return (e) => {
      e.stopPropagation();
      componentsDispatcher({type: 'remove', payload: index});
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
        {innerComponents.map((item, index) => (
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
      {isShowIngredientInfo && selectedIngredient && (
          <Modal title="Детали ингредиента" onClose={handleCloseModal} >
            <IngredientDetails ingredient={selectedIngredient} />
          </Modal>
        )
      }
      {isShowOrderInfo && (
          <Modal title="" onClose={handleCloseOrderModal} >
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )
      }
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
