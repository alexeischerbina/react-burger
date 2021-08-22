import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import styles from "./feed.module.css";
import OrderList from "../components/OrderList/OrderList";
import {wsConnectionStart} from '../services/slices/ws';

export function Feed() {
  const dispatch = useDispatch();
  const ordersState = useSelector(({orders}) => orders);
  const ordersResponse = ordersState.orders;
  const {wsConnected} = ordersState;

  useEffect(() => {
    if (!wsConnected) {
      dispatch(wsConnectionStart());
    }
  }, [wsConnected, dispatch]);
  const {total, totalToday} = ordersResponse;

  const orderList = ordersResponse.orders || [];

  const orders = {
    done: [],
    pending: []
  };

  orderList.forEach(order => {
    if (order.status === 'done' || order.status === 'pending') {
      orders[order.status].push(order.number);
    }
  });

  return (
    <div className={`${styles.wrapper} mb-5`}>
      <h1 className={"text text_type_main-large mb-5"}>Лента заказов</h1>
      <section className={styles.feed_wrapper}>
        <div className={styles.feed_inner}>
          <OrderList orderList={orderList}/>
        </div>
        <div className={styles.feed_inner}>
          <ul className={`${styles.feed_order_status}`}>
            <li className={styles.feed_order_status_type}>
              <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
              <ul className={styles.feed_order_status_type_list}>
                {orders.done.map(order => (
                  <li className={`text text_type_digits-default ${styles.feed_order_cyan_colored}`}
                      key={order}>{order}</li>
                ))}
              </ul>
            </li>
            <li className={styles.feed_order_status_type}>
              <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
              <ul className={styles.feed_order_status_type_list}>
                {orders.pending.map(order => (
                  <li className={`text text_type_digits-default`} key={order}>{order}</li>
                ))}
              </ul>
            </li>
          </ul>
          <p className={`text text_type_main-medium ${styles.text_shadow}`}>Выполнено за все время:</p>
          <p className={`text text_type_digits-large mb-15 ${styles.text_shadow}`}>{total}</p>
          <p className={`text text_type_main-medium ${styles.text_shadow}`}>Выполнено за сегодня:</p>
          <p className={`text text_type_digits-large ${styles.text_shadow}`}>{totalToday}</p>
        </div>
      </section>
    </div>
  );
}