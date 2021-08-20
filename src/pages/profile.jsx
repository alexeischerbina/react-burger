import React from 'react';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import ProfileForm from "../components/ProfileForm/ProfileForm";
import styles from './profile.module.css';
import {logout} from "../services/slices/user";

export function ProfilePage() {
  const dispatch = useDispatch();
  const {isAuth} = useSelector(({user}) => user);

  const onLogoutClick = () => {
    dispatch(logout());
  }

  if (!isAuth) {
    return (
      <Redirect to={"/login"}/>
    );
  }

  return (
    <ul className={`${styles.wrapper} mt-30`}>
      <li className={styles.left_panel}>
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
            <NavLink to="/profile/orders" className={"text text_type_main-medium text_color_inactive"} activeStyle={{
              color: "white"
            }}>
              История заказов
            </NavLink>
          </li>
          <li className={styles.nav_link}>
            <button className={"text text_type_main-medium text_color_inactive"} onClick={onLogoutClick}>Выход</button>
          </li>
        </ul>
        <p className={`${styles.description} text text_type_main-default text_color_inactive`}>В этом разделе вы можете
          изменить свои персональные данные</p>
      </li>
      <li className={styles.right_panel}>
        <Switch>
          <Route path="/profile" exact={true}>
            <ProfileForm/>
          </Route>
          <Route path="/profile/orders" exact={true}>
            <p className={`text text_type_main-default`}>В разработке. Здесь будет список заказов</p>
          </Route>
          <Route path="/profile/orders/:id">
            <p className={`text text_type_main-default`}>В разработке. Здесь будет инфомация о заказе</p>
          </Route>
        </Switch>
      </li>
    </ul>
  );
}
