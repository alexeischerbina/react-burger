import React from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './BurgerIngredients.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { showIngredientInfo } from '../../services/slices/index';
import { addIngredient } from '../../services/slices/burgerConstructor';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('buns');

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.data);
  const components = useSelector(state => state.ingredients);

  const handleOpenModal = (ingredient) => {
    return () => {
      dispatch(showIngredientInfo({ ingredient }));
      // Временно (пока не освоили dnd) по  клику добавляем компонент в Конструктор Бургера
      dispatch(addIngredient({ ingredient }));
    }
  };

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

  data.forEach(item => {
    if (item.type === 'bun') {
      sortedData[typeIngredient.buns].data.push(item);
    } else if (item.type === 'sauce') {
      sortedData[typeIngredient.sauces].data.push(item);
    } else {
      sortedData[typeIngredient.mains].data.push(item);
    }
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

  return (
    <div className={burgerIngredientsStyles["burger-ingredients"]}>
      <div className={`${burgerIngredientsStyles["burger-ingredients-tab"]} mb-10`}>
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
      <ul className={burgerIngredientsStyles["burger-ingredients-type-list"]}>
        {sortedData.map(type => (
          <li className={burgerIngredientsStyles["burger-ingredients-type-item"]} key={type.title}>
            <h2 className={"text text_type_main-medium"}>{type.title}</h2>
            <ul className={`${burgerIngredientsStyles["burger-ingredients-list"]} pl-4 pr-4`}>
              {type.data.map(item => (
                <li className={`${burgerIngredientsStyles["burger-ingredients-item"]} mb-2`} key={item._id} onClick={handleOpenModal(item)}>
                  {getIngredientCount(item) ? <Counter count={getIngredientCount(item)} size="default" className={burgerIngredientsStyles["burger-ingredients-item-cnt"]} /> : null}
                  <img src={item.image_large} alt={item.name} className={`${burgerIngredientsStyles["burger-ingredients-item-img"]} pr-4 pl-4`} />
                  <div className={burgerIngredientsStyles["burger-ingredients-item-price"]}>
                    <span className={"text text_type_digits-default"}>{item.price}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                  <span className={`${burgerIngredientsStyles["burger-ingredients-item-name"]} text text_type_main-default`}>{item.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
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

// BurgerIngredients.propTypes = {
//   data: PropTypes.arrayOf(dataPropType.isRequired)
// };

export default BurgerIngredients;
