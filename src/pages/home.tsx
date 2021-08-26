import React from 'react';
import {useDrop} from "react-dnd";
import {useAppDispatch, useAppSelector} from "../services/hooks";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import {getData} from "../services/slices/burgerIngredients";
import {addIngredient} from "../services/slices/burgerConstructor";
import styles from "./home.module.css";

const dataURL = 'https://norma.nomoreparties.space/api/ingredients';

export {dataURL};

export function HomePage() {
  const dispatch = useAppDispatch();
  const {data, dataRequest, dataFailed} = useAppSelector(({data}) => data);

  React.useEffect(() => {
    if (data.length === 0) {
      dispatch(getData(dataURL));
    }
  }, [dispatch, data.length]);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch(addIngredient(ingredient))
    }
  });

  return (
    <section className={`${styles["section-make-burger"]} mb-10`}>
      {dataRequest ? <span className="text text_type_main-medium">Загружаем компоненты...</span>
        : dataFailed ? <span className="text text_type_main-medium">Произошла ошибка при загрузке :( </span>
          : data.length ? <>
            <h1 className="text text_type_main-large mb-5">
              Собери бургер
            </h1>
            <ul className={styles["section-make-burger-list"]}>
              <li className={`${styles["section-make-burger-item"]} mr-10`}>
                <BurgerIngredients/>
              </li>
              <li className={styles["section-make-burger-item"]} ref={dropTarget}>
                <BurgerConstructor/>
              </li>
            </ul>
          </> : <span className="text text_type_main-medium">Сегодня ничего нет в меню :(</span>}
    </section>
  );
}