import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {Link, useLocation} from 'react-router-dom';

import OrderListItem from "../OrderListItem/OrderListItem";
import styles from './OrderList.module.css';
import {getData} from "../../services/slices/burgerIngredients";
import {dataURL} from '../../pages/home';

import {IOrder} from "../../services/types";

type TOrderList = {
  orderList: Array<IOrder>;
  showStatus: boolean;
};

const OrderList:FC<TOrderList> = ({orderList, showStatus}) => {
  const dispatch = useAppDispatch();
  const {data, dataRequest} = useAppSelector(({data}) => data);
  const location = useLocation();

  React.useEffect(() => {
    if (data.length === 0) {
      dispatch(getData(dataURL));
    }
  }, [dispatch, data.length]);

  return (
    <>
      {dataRequest
        ? (<div className={'text text_type_main-large'}>Загрузка...</div>)
        : (<ul className={styles.order_list}>
          {orderList.map(order => (
            <li key={order._id}>
              <Link to={{
                pathname: `${location.pathname}/${order._id}`,
                state: {background: location}
              }}>
                <OrderListItem order={order} key={order._id} showStatus={showStatus}/>
              </Link>
            </li>
          ))}
        </ul>)}
    </>
  );
}

export default OrderList;