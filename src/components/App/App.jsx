import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import appStyles from './App.module.css';

import { BurgerComponentsContext } from '../../services/BurgerContext';

const dataURL = 'https://norma.nomoreparties.space/api/ingredients';
const initialComponents = {
  bun: undefined,
  components: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      if (action.payload.type === 'bun') {
        return {...state, bun: action.payload};
      } else {
        return {...state, components: [...state.components, action.payload]};
      }
    }
    case 'remove': {
      return {...state, components: state.components.filter((item, index) => index !== action.payload)};
    }
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  const [data, setData] = React.useState(null);
  const [ components, componentsDispatcher ] = React.useReducer(reducer, initialComponents, undefined);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(dataURL);
        const data = await res.json();
        if (data.success) {
          setData(data.data);
        } else {
          throw new Error('Error loading data');
        }

      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className={`${appStyles["section-make-burger"]} mb-10`}>
          <BurgerComponentsContext.Provider value={{components, componentsDispatcher}}>
            {data ? <>
              <h1 className="text text_type_main-large mb-5">
                Собери бургер
              </h1>
              <ul className={appStyles["section-make-burger-list"]}>
                <li className={`${appStyles["section-make-burger-item"]} mr-10`}>
                  <BurgerIngredients data={data} />
                </li>
                <li className={appStyles["section-make-burger-item"]}>
                    <BurgerConstructor />
                </li>
              </ul>
            </> : <span className="text text_type_main-medium">Загружаем компоненты...</span>}
          </BurgerComponentsContext.Provider>
        </section>
      </main>
      </div>
  );
}

export default App;
