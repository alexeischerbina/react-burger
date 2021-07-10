import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './BurgerIngredients.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { showIngredientInfo } from '../../services/slices/index';
// import { addIngredient } from '../../services/slices/burgerConstructor';
import { updateCurrentTab } from '../../services/slices/burgerIngredients';

import BurgerIngredient from './BurgerIngredient';

function BurgerIngredients(props) {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.data);

  const { currentTab } = useSelector(state => state.data);

  const handleOpenModal = (ingredient) => {
    return () => {
      dispatch(showIngredientInfo({ ingredient }));
    }
  };

  const setTab = (tab) => {
    const ulIngredients = document.getElementById('ingredients_list');
    const ingredientsBlock = document.getElementById(`${tab}_list`);
    // Не работает для начинок, разобраться
    ulIngredients.scrollTo(0, ingredientsBlock.getBoundingClientRect().y - ulIngredients.getBoundingClientRect().y);
  }

  const handleScroll = (e) => {
    const ulIngredients = e.target;
    const parentTop = ulIngredients.getBoundingClientRect().y;
    const saucesTop = ulIngredients.querySelector('#sauces_list').getBoundingClientRect().y;
    const mainsTop = ulIngredients.querySelector('#mains_list').getBoundingClientRect().y;

    if (mainsTop - parentTop <= 0) {
      dispatch(updateCurrentTab({ tab: 'mains'}))
    } else if (saucesTop - parentTop <= 0) {
      dispatch(updateCurrentTab({ tab: 'sauces'}))
    } else {
      dispatch(updateCurrentTab({ tab: 'buns'}))
    }
  }

  const sortedData = [{
    title: 'Булки',
    data: [],
    type: 'buns'
  }, {
    title: 'Соусы',
    data: [],
    type: 'sauces'
  }, {
    title: 'Начинки',
    data: [],
    type: 'mains'
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

  return (
    <div className={burgerIngredientsStyles["burger-ingredients"]}>
      <div className={`${burgerIngredientsStyles["burger-ingredients-tab"]} mb-10`}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === 'mains'} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <ul className={burgerIngredientsStyles["burger-ingredients-type-list"]} onScroll={handleScroll} id="ingredients_list" >
        {sortedData.map(type => (
          <li className={burgerIngredientsStyles["burger-ingredients-type-item"]} key={type.title} id={`${type.type}_list`}>
            <h2 className={"text text_type_main-medium"}>{type.title}</h2>
            <ul className={`${burgerIngredientsStyles["burger-ingredients-list"]} pl-4 pr-4`}>
              {type.data.map(item => (
                <li className={`${burgerIngredientsStyles["burger-ingredients-item"]} mb-2`} key={item._id} onClick={handleOpenModal(item)}>
                  <BurgerIngredient ingredient={item}/>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
// {getIngredientCount(item) ? <Counter count={getIngredientCount(item)} size="default" className={burgerIngredientsStyles["burger-ingredients-item-cnt"]} /> : null}
// <img src={item.image_large} alt={item.name} className={`${burgerIngredientsStyles["burger-ingredients-item-img"]} pr-4 pl-4`} />
// <div className={burgerIngredientsStyles["burger-ingredients-item-price"]}>
//   <span className={"text text_type_digits-default"}>{item.price}</span>
//   <CurrencyIcon type="primary" />
// </div>
// <span className={`${burgerIngredientsStyles["burger-ingredients-item-name"]} text text_type_main-default`}>{item.name}</span>

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
