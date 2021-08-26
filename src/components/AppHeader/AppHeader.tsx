import React from 'react';
import {useAppSelector} from "../../services/hooks";
import {Link, NavLink} from 'react-router-dom';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './AppHeader.module.css';

const AppHeader = () => {
  const {isAuth, name} = useAppSelector(({user}) => user);

  const loginPath = isAuth ? 'profile' : 'login';

  return (
    <header className={`${appHeaderStyles.header} mb-10`}>
      <nav className={appHeaderStyles['nav-header']}>
        <ul className={appHeaderStyles['nav-list']}>
          <li className={`pt-4 pr-5 pb-4 pl-5`}>
            <NavLink to="/" exact={true} className={`${appHeaderStyles['nav-item']}`}
                     activeClassName={`${appHeaderStyles['nav-item-active']}`}>
              <BurgerIcon type="secondary"/>
              <span className={`pl-2 text text_type_main-default text_color_inactive`}>Конструктор</span>
            </NavLink>
          </li>
          <li className={`${appHeaderStyles['nav-item']} pt-4 pr-5 pb-4 pl-5`}>
            <NavLink to="/feed" exact={true} className={`${appHeaderStyles['nav-item']}`}
                     activeClassName={`${appHeaderStyles['nav-item-active']}`}>
              <ListIcon type="secondary"/>
              <span className={`pl-2 text text_type_main-default text_color_inactive`}>Лента заказов</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to={"/"}>
        <Logo/>
      </Link>
      <div className={`pt-4 pr-5 pb-4 pl-5`}>
        <NavLink to={`/${loginPath}`} exact={true} className={`${appHeaderStyles['header-personal-area']}`}
                 activeClassName={`${appHeaderStyles['nav-item-active']}`}>
          <ProfileIcon type="secondary"/>
          <span
            className={`pl-2 text text_type_main-default text_color_inactive`}>{name ? name : 'Личный кабинет'}</span>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
