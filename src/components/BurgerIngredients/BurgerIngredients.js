import React from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsStyles from './BurgerIngredients.module.css';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('buns');

  const sortedData = [{
    title: 'Булки',
    data: []
  }, {
    title: 'Соусы',
    data: []
  }, {
    title: 'Начинки',
    data: []
  }];

  const typeIngredient = {
    buns: 0,
    sauces: 1,
    mains: 2
  };

  props.data.forEach(item => {
    if (item.type === 'bun') {
      sortedData[typeIngredient.buns].data.push(item);
    } else if (item.type === 'sauce') {
      sortedData[typeIngredient.sauces].data.push(item);
    } else {
      sortedData[typeIngredient.mains].data.push(item);
    }
  });

  return (
    <div className={BurgerIngredientsStyles["burger-ingredients"]}>
      <div className={`${BurgerIngredientsStyles["burger-ingredients-tab"]} mb-10`}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={BurgerIngredientsStyles["burger-ingredients-type-list"]}>
        {sortedData.map(type => (
          <li className={BurgerIngredientsStyles["burger-ingredients-type-item"]} key={type.title}>
            <h2 className={"text text_type_main-medium"}>{type.title}</h2>
            <ul className={`${BurgerIngredientsStyles["burger-ingredients-list"]} pl-4 pr-4`}>
              {type.data.map(item => (
                <li className={`${BurgerIngredientsStyles["burger-ingredients-item"]} mb-2`} key={item._id}>
                  {Math.floor(Math.random() * 100) > 70 ? <Counter count={1} size="default" className={BurgerIngredientsStyles["burger-ingredients-item-cnt"]} /> : null}
                  <img src={item.image_large} alt={item.name} className={`${BurgerIngredientsStyles["burger-ingredients-item-img"]} pr-4 pl-4`} />
                  <div className={BurgerIngredientsStyles["burger-ingredients-item-price"]}>
                    <span className={"text text_type_digits-default"}>{item.price}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                  <span className={`${BurgerIngredientsStyles["burger-ingredients-item-name"]} text text_type_main-default`}>{item.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropType.isRequired)
};

export default BurgerIngredients;