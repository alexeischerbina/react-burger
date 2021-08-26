import React, {useEffect} from 'react';
import {Route, Switch, Redirect, NavLink, useLocation, useHistory} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from "../services/hooks";
import ProfileForm from "../components/ProfileForm/ProfileForm";
import styles from './profile.module.css';
import {logout} from "../services/slices/user";
import OrderList from "../components/OrderList/OrderList";
import OrderInfo from "../components/OrderInfo/OrderInfo";
import Modal from "../components/Modal/Modal";
import {
  wsUserConnectionStart
} from '../services/slices/wsUser';

import {ILocation} from "../services/types";

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const {isAuth} = useAppSelector(({user}) => user);
  const location = useLocation<ILocation>();
  const history = useHistory();
  const {orders, wsConnected} = useAppSelector(({ordersUser}) => ordersUser);

  useEffect(() => {
    if (!wsConnected) {
      dispatch(wsUserConnectionStart());
    }
  }, [wsConnected, dispatch]);

  const onLogoutClick = () => {
    dispatch(logout());
  }

  if (!isAuth) {
    return (
      <Redirect to={"/login"}/>
    );
  }

  const background = history.action === 'PUSH' && location.state && location.state.background;// location.state;

  return (
    <ul className={`${styles.wrapper} mt-10`}>
      <Switch location={background || location}>
        <Route path={'/profile/orders/:orderId'} exact={true}>
          <OrderInfo/>
        </Route>
        <Route path={'/'}>
          <li className={`${styles.left_panel} mt-20`}>
            <ul className={"pb-20"}>
              <li className={styles.nav_link}>
                <NavLink to="/profile" exact={true} className={"text text_type_main-medium text_color_inactive"}
                         activeStyle={{
                           color: "white"
                         }}>
                  Профиль
                </NavLink>
              </li>
              <li className={styles.nav_link}>
                <NavLink to="/profile/orders" className={"text text_type_main-medium text_color_inactive"}
                         activeStyle={{
                           color: "white"
                         }}>
                  История заказов
                </NavLink>
              </li>
              <li className={styles.nav_link}>
                <button className={"text text_type_main-medium text_color_inactive"} onClick={onLogoutClick}>Выход
                </button>
              </li>
            </ul>
            <p className={`${styles.description} text text_type_main-default text_color_inactive`}>В этом разделе вы
              можете
              изменить свои персональные данные</p>
          </li>
          <li className={`${styles.right_panel} mb-5`}>
            <Switch location={background || location}>
              <Route path="/profile" exact={true}>
                <ProfileForm/>
              </Route>
              <Route path="/profile/orders" exact={true}>
                <OrderList orderList={orders} showStatus={true}/>
              </Route>
            </Switch>
          </li>
        </Route>
      </Switch>
      {background && (
        <Modal title="Заказ" onClose={() => {
          history.push('/profile/orders');
        }}>
          <OrderInfo/>
        </Modal>
      )}
    </ul>
  );
}
