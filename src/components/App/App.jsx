import React from 'react';
import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {hideIngredientInfo, orderClose} from '../../services/slices/index';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedIngredientRoute from "../ProtectedIngredientRoute/ProtectedIngredientRoute";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404,
  ProfilePage
} from '../../pages'

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {path} = useRouteMatch();
  const {currentIngredient} = useSelector(({currentIngredient}) => currentIngredient);
  const {orderRequest, orderFailed, orderNumber} = useSelector(({order}) => order);

  const handleCloseModal = () => {
    dispatch(hideIngredientInfo());
    history.push('/');
  }

  const handleCloseOrderModal = () => {
    dispatch(orderClose());
  }

  return (
    <div className="App">
      <AppHeader/>
      <main>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage/>
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage/>
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage/>
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage/>
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage/>
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage/>
          </ProtectedRoute>
          <ProtectedIngredientRoute path={`${path}ingredients/:ingredientId`} exact={true}>
            {currentIngredient && (
              <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails ingredient={currentIngredient}/>
              </Modal>
            )}
          </ProtectedIngredientRoute>
          <Route>
            <NotFound404/>
          </Route>
        </Switch>
      </main>
      {orderNumber && !orderRequest && (
        <Modal title="" onClose={handleCloseOrderModal}>
          {!orderFailed
            ? (<OrderDetails orderNumber={orderNumber}/>)
            : (<span
              className="text text_type_main-medium">Не удалось оформить заказ. Пожалуйста, попробуйте позже.</span>)
          }
        </Modal>
      )
      }
    </div>
  );
}

export default App;
