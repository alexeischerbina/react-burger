import React, {useEffect} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {orderClose} from '../../services/slices/index';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import OrderInfo from "../OrderInfo/OrderInfo";

import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404,
  ProfilePage,
  Feed
} from '../../pages'

import Loader from "react-loader-spinner";
import styles from "./App.module.css"
import {updateUserName} from "../../services/slices/user";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const {orderRequest, orderFailed, orderNumber} = useSelector(({order}) => order);
  const {isAuth, name} = useSelector(({user}) => user);

  useEffect(() => {
    if (isAuth && !name) {
      dispatch(updateUserName());
    }
  }, [dispatch, isAuth, name]);

  const handleCloseModal = () => {
    history.push('/');
  }

  const handleCloseOrderModal = () => {
    dispatch(orderClose());
  }

  let background = location.state;
  if (location.state) {
    background = location.state.background;
  }

  // При обновлении страницы с открытым попапом action === 'POP', и мы должны открывать страницу, а не попап
  if (history.action !== 'PUSH') {
    background = undefined;
  }

  return (
    <div className={styles.wrapper}>
      <AppHeader/>
      <main>
        <Switch location={background || location}>
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
          <Route path={"/ingredients/:ingredientId"}>
            <IngredientDetails className={"mt-30"} title={"Детали ингредиента"}/>
          </Route>
          <Route path={"/feed"} exact={true}>
            <Feed/>
          </Route>
          <Route path={"/feed/:orderId"} exact={true}>
            <OrderInfo className={"mt-30"}/>
          </Route>
          <Route>
            <NotFound404/>
          </Route>
        </Switch>
      </main>
      {background && (
        <Switch>
          <Route path={"/ingredients/:ingredientId"} exact={true}>
            <Modal title="Детали ингредиента" onClose={handleCloseModal}>
              <IngredientDetails/>
            </Modal>
          </Route>
          <Route path={"/feed/:orderId"} exact={true}>
            <Modal title={'Заказ'} onClose={() => {
              history.push('/feed');
            }}>
              <OrderInfo/>
            </Modal>
          </Route>
        </Switch>
      )}
      {orderRequest && (<Loader
        className={styles.loader}
        type="Oval"
        color="#9C64D9"
        height={200}
        width={200}
      />)
      }
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
