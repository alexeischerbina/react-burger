import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './appHeader.module.css';

class AppHeader extends React.Component {
  render() {
    return (
      <header className={`${appHeaderStyles.header} pb-10 pt-10`}>
        <nav className={appHeaderStyles['nav-header']}>
          <ul className={appHeaderStyles['nav-list']}>
            <li className={`${appHeaderStyles['nav-item']} pt-4 pr-5 pb-4 pl-5`}>
              <BurgerIcon type="primary"/>
              <span className={`pl-2 text text_type_main-default`}>Конструктор</span>
            </li>
            <li className={`${appHeaderStyles['nav-item']} pt-4 pr-5 pb-4 pl-5`}>
              <ListIcon type="secondary" />
              <span className={`pl-2 text text_type_main-default text_color_inactive`}>Лента заказов</span>
            </li>
          </ul>
        </nav>
        <Logo />
        <div className={`${appHeaderStyles['header-personal-area']} pt-4 pr-5 pb-4 pl-5`}>
          <ProfileIcon type="secondary" />
          <span className={`pl-2 text text_type_main-default text_color_inactive`}>Личный кабинет</span>
        </div>
      </header>
    );
  }
}

export default AppHeader;