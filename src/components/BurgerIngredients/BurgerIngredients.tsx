import React, {FC} from 'react';
import {useLocation, Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import {updateCurrentTab} from '../../services/slices/burgerIngredients';
import BurgerIngredient from './BurgerIngredient';
import burgerIngredientsStyles from './BurgerIngredients.module.css';

import {IIngredient} from "../../services/types";

const  BurgerIngredients:FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {data, currentTab} = useAppSelector(({data}) => data);
    const {qty} = useAppSelector(({ingredients}) => ingredients);

    const setTab = (tab: string) => {
        const ulIngredients: HTMLElement | null = document.getElementById('ingredients_list');
        const ingredientsBlock: HTMLElement | null = document.getElementById(`${tab}_list`);
        if (ulIngredients && ingredientsBlock) {
            ulIngredients.scrollTo(0, ingredientsBlock.offsetTop - ulIngredients.offsetTop);
        }
    }

    const handleScroll = (e: React.SyntheticEvent): void => {
        const ulIngredients = e.target as HTMLElement;
        const parentTop = ulIngredients.getBoundingClientRect().y;
        const saucesTop = ulIngredients.querySelector('#sauces_list')?.getBoundingClientRect().y;
        const mainsTop = ulIngredients.querySelector('#mains_list')?.getBoundingClientRect().y;
        if (mainsTop && saucesTop) {
            if (mainsTop - parentTop <= 0) {
                dispatch(updateCurrentTab({tab: 'mains'}))
            } else if (saucesTop - parentTop <= 0) {
                dispatch(updateCurrentTab({tab: 'sauces'}))
            } else {
                dispatch(updateCurrentTab({tab: 'buns'}))
            }
        }
    }

    type TSortedData = {
        title: string;
        data: Array<IIngredient>;
        type: string;
    };

    const sortedData: Array<TSortedData> = [{
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

    data.forEach((item: IIngredient) => {
        if (item.type === 'bun') {
            sortedData[typeIngredient.buns].data.push(item);
        } else if (item.type === 'sauce') {
            sortedData[typeIngredient.sauces].data.push(item);
        } else {
            sortedData[typeIngredient.mains].data.push(item);
        }
    });

    const getIngredientCount = (ingredient: IIngredient) => {
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
                                <li className={`${burgerIngredientsStyles["burger-ingredients-item"]} mb-2`}
                                    key={item._id}>
                                    <Link to={{
                                        pathname: `/ingredients/${item._id}`,
                                        state: {background: location}
                                    }}>
                                        <BurgerIngredient ingredient={item} cnt={getIngredientCount(item)}/>
                                    </Link>
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
