import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import appStyles from './App.module.css';

import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import { useSelector, useDispatch } from 'react-redux';
import { hideIngredientInfo, orderClose } from '../../services/slices/index';
import { getData } from '../../services/slices/burgerIngredients';

const dataURL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const dispatch = useDispatch();
  const {currentIngredient} = useSelector(state => state.currentIngredient);
  const { data, dataRequest, dataFailed } = useSelector(state => state.data);
  const { orderRequest, orderFailed, orderNumber } = useSelector(state => state.order);

  const handleCloseModal = () => {
    dispatch(hideIngredientInfo());
  }

  const handleCloseOrderModal = () => {
    dispatch(orderClose());
  }

  React.useEffect(() => {
    dispatch(getData(dataURL));
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className={`${appStyles["section-make-burger"]} mb-10`}>
            {dataRequest ? <span className="text text_type_main-medium">Загружаем компоненты...</span>
              : dataFailed ? <span className="text text_type_main-medium">Произошла ошибка при загрузке :( </span>
              : data.length ? <>
              <h1 className="text text_type_main-large mb-5">
                Собери бургер
              </h1>
              <ul className={appStyles["section-make-burger-list"]}>
                <li className={`${appStyles["section-make-burger-item"]} mr-10`}>
                  <BurgerIngredients />
                </li>
                <li className={appStyles["section-make-burger-item"]}>
                    <BurgerConstructor />
                </li>
              </ul>
            </> : <span className="text text_type_main-medium">Сегодня ничего нет в меню :(</span>}
        </section>
      </main>
      {currentIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal} >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      { orderNumber && !orderRequest && (
        <Modal title="" onClose={handleCloseOrderModal} >
          {!orderFailed
            ? (<OrderDetails orderNumber={orderNumber} />)
            : (<span className="text text_type_main-medium">Не удалось оформить заказ. Пожалуйста, попробуйте позже.</span>)
          }
        </Modal>
      )
      }
      </div>
  );
}

export default App;
