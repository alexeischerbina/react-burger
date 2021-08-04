import React from 'react';
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import {showIngredientInfo} from '../../services/slices/index';
import {updateCurrentTab} from '../../services/slices/burgerIngredients';
import BurgerIngredient from './BurgerIngredient';
import burgerIngredientsStyles from './BurgerIngredients.module.css';

function BurgerIngredients() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {data, currentTab} = useSelector(({data}) => data);
  const {qty} = useSelector(({ingredients}) => ingredients);

  const handleOpenModal = (ingredient) => {
    return () => {
      dispatch(showIngredientInfo({ingredient}));
      history.push(`/ingredients/${ingredient._id}`);
    }
  };

  const setTab = (tab) => {
    const ulIngredients = document.getElementById('ingredients_list');
    const ingredientsBlock = document.getElementById(`${tab}_list`);
    ulIngredients.scrollTo(0, ingredientsBlock.offsetTop - ulIngredients.offsetTop);
  }

  const handleScroll = (e) => {
    const ulIngredients = e.target;
    const parentTop = ulIngredients.getBoundingClientRect().y;
    const saucesTop = ulIngredients.querySelector('#sauces_list').getBoundingClientRect().y;
    const mainsTop = ulIngredients.querySelector('#mains_list').getBoundingClientRect().y;

    if (mainsTop - parentTop <= 0) {
      dispatch(updateCurrentTab({tab: 'mains'}))
    } else if (saucesTop - parentTop <= 0) {
      dispatch(updateCurrentTab({tab: 'sauces'}))
    } else {
      dispatch(updateCurrentTab({tab: 'buns'}))
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

  const getIngredientCount = (ingredient) => {
    return qty[ingredient._id] ? qty[ingredient._id] : 0;
  }

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
      <ul className={burgerIngredientsStyles["burger-ingredients-type-list"]} onScroll={handleScroll}
          id="ingredients_list">
        {sortedData.map(type => (
          <li className={burgerIngredientsStyles["burger-ingredients-type-item"]} key={type.title}
              id={`${type.type}_list`}>
            <h2 className={"text text_type_main-medium"}>{type.title}</h2>
            <ul className={`${burgerIngredientsStyles["burger-ingredients-list"]} pl-4 pr-4`}>
              {type.data.map(item => (
                <li className={`${burgerIngredientsStyles["burger-ingredients-item"]} mb-2`} key={item._id}
                    onClick={handleOpenModal(item)}>
                  <BurgerIngredient ingredient={item} cnt={getIngredientCount(item)}/>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BurgerIngredients;
