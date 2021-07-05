import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import burgerConstructorStyles from './BurgerConstructor.module.css';

import {orderData} from '../../utils/data';

function BurgerConstructor(props) {
  const newData = props.data.slice();
  const firstElement = newData.shift();
  const total = newData.length ?  (newData.reduce((sum, cur) => sum + cur.price, 0) + firstElement.price * 2) : 0;

  const [isShowIngredientInfo, setIsShowIngredientInfo] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);

  const [isShowOrderInfo, setIsShowOrderInfo] = React.useState(false);

  const handleOpenModal = (ingredient) => {
    return () => {
      setSelectedIngredient(ingredient);
      setIsShowIngredientInfo(true);
    }
  };

  const handleCloseModal = () => {
    setIsShowIngredientInfo(false);
  }

  const handleOpenOrderModal = () => {
    setIsShowOrderInfo(true);
  }

  const handleCloseOrderModal = () => {
    setIsShowOrderInfo(false);
  }

  return (
    <div className={`${burgerConstructorStyles["burger-constructor"]} pl-4`}>
      {firstElement && <div className="pl-8" onClick={handleOpenModal(firstElement)}>
        <ConstructorElement
                text={`${firstElement.name} (верх)`}
                price={firstElement.price}
                thumbnail={firstElement.image}
                isLocked={true}
                type={'top'}
        />
      </div>}
      <ul className={`${burgerConstructorStyles["burger-constructor-list"]} pr-2`}>
        {newData.map(item => (
          <li className={burgerConstructorStyles["burger-constructor-list-item"]} key={item._id}>
            <DragIcon type="primary"/>
            <div className={burgerConstructorStyles["burger-constructor-list-item-inner"]} onClick={handleOpenModal(item)}>
              <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
              />
            </div>
          </li>
        ))}
      </ul>
      {firstElement && <div className="pl-8 mb-10" onClick={handleOpenModal(firstElement)}>
        <ConstructorElement
                text={`${firstElement.name} (низ)`}
                price={firstElement.price}
                thumbnail={firstElement.image}
                isLocked={true}
                type={'bottom'}
        />
      </div>}
      <div className={`${burgerConstructorStyles["burger-constructor-summary-and-offer-btn"]} pr-4`}>
        <div className={`${burgerConstructorStyles['burger-constructor-summary']} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOpenOrderModal}>
          Оформить
        </Button>
      </div>
      {isShowIngredientInfo && selectedIngredient &&
          <Modal title="Детали ингредиента" onClose={handleCloseModal} >
            <IngredientDetails ingredient={selectedIngredient} />
          </Modal>}
      {isShowOrderInfo &&
          <Modal title="" onClose={handleCloseOrderModal} >
            <OrderDetails orderData={orderData} />
          </Modal>}
    </div>
  );
}

const dataPropType = PropTypes.shape({
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropType.isRequired)
};

export default BurgerConstructor;
