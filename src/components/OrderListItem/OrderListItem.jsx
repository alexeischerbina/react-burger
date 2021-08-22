import React from 'react';
import {useSelector} from 'react-redux';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderListItem.module.css';
import {humanReadableDate} from "../../services/utils";

export default function OrderListItem({order, showStatus = false}) {
  const {ingredients, status, number, name, createdAt} = order;
  const {data} = useSelector(({data}) => data);

  let total = 0;
  let componentIconArr = [];
  const showMore = ingredients.length > 6;
  const extraCnt = ingredients.length - 6;
  ingredients.slice(0, 6).forEach(ingredientId => {
    let ingredient = data.find(component => component._id === ingredientId);
    if (!ingredient) {
      console.log('Ошибка. Компонент не найден');
      return;
    }
    total += ingredient.price * (ingredient.type === 'bun' ? 2 : 1);
    componentIconArr.push(ingredient.image_mobile);

  })

  const statusText = (status) => {
    const style = {};
    let text = ''
    switch (status) {
      case 'created':
        text = 'Создан';
        break;
      case 'pending':
        text = 'Готовится';
        break;
      case 'done':
        text = 'Выполнен';
        style.color = '#00CCCC';
        break;
      default:
    }
    return (
      <p className="text text_type_main-default mb-6" style={style}>{text}</p>
    );
  }

  return (
    <div className={`${styles.order} mr-3 p-6`}>
      <div className={`${styles.order_number_date} mb-6`}>
        <span className={'text text_type_main-default'}>#{number}</span>
        <span
          className={'text text_type_main-default text_color_inactive'}>{humanReadableDate(new Date(createdAt))}</span>
      </div>
      <p className={`text text_type_main-medium ${showStatus ? 'mb-2' : 'mb-6'}`}>{name}</p>
      {showStatus && statusText(status)}
      <div className={styles.order_components_total}>
        <div className={styles.order_icons}>
          {componentIconArr.map((img, index) => (
            <img
              className={`${styles.order_component_icon} ${index === 5 && showMore && styles.order_component_icon_more}`}
              src={img}
              key={index}
              style={{zIndex: 10 - index}}
              alt=""
            />
          ))}
          {showMore && <div className={`text text_type_main-default ${styles.more_items}`}>+{extraCnt}</div>}
        </div>
        <div className={styles.order_total}><p className={'text text_type_digits-default mr-2'}>{total}</p><CurrencyIcon
          type="primary"/></div>
      </div>
    </div>
  );
}