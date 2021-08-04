import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './AppHeader.module.css';

const AppHeader = () => {
  const {isAuth} = useSelector(({user}) => user);

  const loginPath = isAuth ? 'profile' : 'login';

  return (
    <header className={`${appHeaderStyles.header} mb-10`}>
      <nav className={appHeaderStyles['nav-header']}>
        <ul className={appHeaderStyles['nav-list']}>
          <li className={`pt-4 pr-5 pb-4 pl-5`}>
            <NavLink to="/" exact={true} className={`${appHeaderStyles['nav-item']}`}
                     activeClassName={`${appHeaderStyles['header-personal-area-active']}`}>
              <BurgerIcon type="secondary"/>
              <span className={`pl-2 text text_type_main-default text_color_inactive`}>Конструктор</span>
            </NavLink>
          </li>
          <li className={`${appHeaderStyles['nav-item']} pt-4 pr-5 pb-4 pl-5`}>
            <ListIcon type="secondary"/>
            <span className={`pl-2 text text_type_main-default text_color_inactive`}>Лента заказов</span>
          </li>
        </ul>
      </nav>
      <Logo/>
      <div className={`pt-4 pr-5 pb-4 pl-5`}>
        <NavLink to={`/${loginPath}`} exact={true} className={`${appHeaderStyles['header-personal-area']}`}
                 activeClassName={`${appHeaderStyles['header-personal-area-active']}`}>
          <ProfileIcon type="secondary"/>
          <span className={`pl-2 text text_type_main-default text_color_inactive`}>Личный кабинет</span>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
