import reducer, {addIngredient, removeIngredient, updateComponentsSort, reset} from './burgerConstructor';

import {TBurgerConstructorState, initialState} from "./burgerConstructor";
import {IIngredient} from "../types";

const testIngredient: IIngredient = {
  _id: '12345',
  name: 'Test ingredient',
  type: 'main',
  proteins: 5,
  fat: 6,
  carbohydrates: 7,
  calories: 10,
  price: 100,
  image: 'test.png',
  image_mobile: 'test_mobile.png',
  image_large: 'test_large.png',
  __v: 1
};
const testIngredientAnother: IIngredient = {
  _id: '23456',
  name: 'Test ingredient another',
  type: 'sauce',
  proteins: 2,
  fat: 20,
  carbohydrates: 5,
  calories: 50,
  price: 20,
  image: 'test_another.png',
  image_mobile: 'test_another_mobile.png',
  image_large: 'test_another_large.png',
  __v: 1
};
const testIngredientThird: IIngredient = {
  _id: '333',
  name: 'Test ingredient third',
  type: 'main',
  proteins: 50,
  fat: 40,
  carbohydrates: 30,
  calories: 500,
  price: 2000,
  image: 'test_third.png',
  image_mobile: 'test_third_another_mobile.png',
  image_large: 'test_third_another_large.png',
  __v: 1
};

const testBun: IIngredient = {
  _id: '54321',
  name: 'Test bun',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 20,
  calories: 100,
  price: 50,
  image: 'test_bun.png',
  image_mobile: 'test_bun_mobile.png',
  image_large: 'test_bun_large.png',
  __v: 1
}

const initialStateWithBunAndIngredients: TBurgerConstructorState = {
  bun: testBun,
  components: [
    {
      id: 0,
      ingredient: testIngredient
    }, {
      id: 1,
      ingredient: testIngredientAnother
    }, {
      id: 2,
      ingredient: testIngredientThird
    }
  ],
  qty: {
    [testBun._id]: 2,
    [testIngredient._id]: 1,
    [testIngredientAnother._id]: 1,
    [testIngredientThird._id]: 1
  }
}

// Можно добавить тест случая с заменой булки

describe('Проверка редьюсера burgerConstructor', () => {
  it('Проверка начального состояния', () => {
    expect(reducer(undefined, {type: 'test'})).toEqual(initialState);
  })

  it('Проверка добавления ингредиента (не булки) ', () => {
    expect(reducer(undefined, addIngredient({ingredient: testIngredient}))).toEqual({
      bun: null,
      components: [
        {
          id: 0,
          ingredient: testIngredient
        }
      ],
      qty: {
        [testIngredient._id]: 1
      }
    });
  })

  it('Проверка добавления ингредиента (булки)', () => {
    expect(reducer(undefined, addIngredient({ingredient: testBun}))).toEqual({
      bun: testBun,
      components: [],
      qty: {
        [testBun._id]: 2
      }
    });
  })

  it('Проверка удаления ингредиента', () => {
    expect(reducer(initialStateWithBunAndIngredients, removeIngredient({index: 1}))).toEqual({
      bun: testBun,
      components: [
        {
          id: 0,
          ingredient: testIngredient
        }, {
          id: 2,
          ingredient: testIngredientThird
        }
      ],
      qty: {
        [testBun._id]: 2,
        [testIngredient._id]: 1,
        [testIngredientAnother._id]: 0,
        [testIngredientThird._id]: 1
      }
    })
  })

  it('Проверка перемещения ингредиента внутри списка', () => {
    expect(reducer(initialStateWithBunAndIngredients, updateComponentsSort({fromIndex: 2, toIndex: 0}))).toEqual({
      bun: testBun,
      components: [
        {
          id: 2,
          ingredient: testIngredientThird
        }, {
          id: 0,
          ingredient: testIngredient
        }, {
          id: 1,
          ingredient: testIngredientAnother
        }
      ],
      qty: {
        [testBun._id]: 2,
        [testIngredient._id]: 1,
        [testIngredientAnother._id]: 1,
        [testIngredientThird._id]: 1
      }
    })
  })

  it('Проверка сброса состояния', () => {
    expect(reducer(initialStateWithBunAndIngredients, reset())).toEqual(initialState);
  })

})
