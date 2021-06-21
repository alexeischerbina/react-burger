import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';

import AppStyles from './App.module.css';

import data from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className={`${AppStyles["section-make-burger"]} mb-10`}>
          <h1 className="text text_type_main-large mb-5">
            Собери бургер
          </h1>
          <ul className={AppStyles["section-make-burger-list"]}>
            <li className={`${AppStyles["section-make-burger-item"]} mr-10`}>
              <BurgerIngredients data={data} />
            </li>
            <li className={AppStyles["section-make-burger-item"]}>
              <BurgerConstructor data={data} />
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
