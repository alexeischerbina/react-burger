import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeaderStyles from './AppHeader.module.css';

class AppHeader extends React.Component {
  render() {
    return (
      <header className={`${AppHeaderStyles.header} pb-10 pt-10`}>
        <nav className={AppHeaderStyles['nav-header']}>
          <ul className={AppHeaderStyles['nav-list']}>
            <li className={`${AppHeaderStyles['nav-item']} pt-4 pr-5 pb-4 pl-5`}>
              <BurgerIcon type="primary"/>
              <span className={`pl-2 text text_type_main-default`}>Конструктор</span>
            </li>
            <li className={`${AppHeaderStyles['nav-item']} pt-4 pr-5 pb-4 pl-5`}>
              <ListIcon type="secondary" />
              <span className={`pl-2 text text_type_main-default text_color_inactive`}>Лента заказов</span>
            </li>
          </ul>
        </nav>
        <Logo />
        <div className={`${AppHeaderStyles['header-personal-area']} pt-4 pr-5 pb-4 pl-5`}>
          <ProfileIcon type="secondary" />
          <span className={`pl-2 text text_type_main-default text_color_inactive`}>Личный кабинет</span>
        </div>
      </header>
    );
  }
}

export default AppHeader;