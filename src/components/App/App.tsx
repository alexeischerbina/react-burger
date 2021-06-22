import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import appStyles from './app.module.css';

import data from '../../utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className={`${appStyles["section-make-burger"]} mb-10`}>
          <h1 className="text text_type_main-large mb-5">
            Собери бургер
          </h1>
          <ul className={appStyles["section-make-burger-list"]}>
            <li className={`${appStyles["section-make-burger-item"]} mr-10`}>
              <BurgerIngredients data={data} />
            </li>
            <li className={appStyles["section-make-burger-item"]}>
              <BurgerConstructor data={data} />
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
