import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

import OrderListItem from "../OrderListItem/OrderListItem";
import styles from './OrderList.module.css';
import {getData} from "../../services/slices/burgerIngredients";
import {dataURL} from '../../pages/home';

export default function OrderList({orderList, showStatus}) {
  const dispatch = useDispatch();
  const {data, dataRequest} = useSelector(({data}) => data);
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

const orderPropType = PropTypes.shape({
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  _id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['created', 'pending', 'done']),
  number: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string
});

OrderList.propTypes = {
  orderList: PropTypes.arrayOf(orderPropType).isRequired,
  showStatus: PropTypes.bool.isRequired,
};
