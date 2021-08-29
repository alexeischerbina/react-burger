import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import styles from './not-found.module.css';

const NotFound404:FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={"text text_type_main-large"}>Упс! Ошибка 404</h1>
      <p className={"text text_type_main-medium text_color_inactive"}>Запрашиваемой страницы не существует</p>
      <br/>
      <br/>
      <p className={"text text_type_main-small"}>
        Проверьте адрес или вернитесь на <Link to='/' className={"text_color_inactive"}>домашнюю страницу</Link>
      </p>
    </div>
  );
}

export {NotFound404};