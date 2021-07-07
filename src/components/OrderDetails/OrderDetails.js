import PropTypes from 'prop-types';

import orderDetailsStyles from './OrderDetails.module.css';
import doneImg from '../../images/done.png';

const OrderDetails = (props) => {
  return (
    <div className={`${orderDetailsStyles.container} mb-15`}>
      <span className={`${orderDetailsStyles.number} mt-4 mb-8 text text_type_digits-large`}>{props.orderNumber}</span>
      <span className="mb-15 text text_type_main-medium">идентификатор заказа</span>
      <img src={doneImg} alt={'done'} className="mb-15"></img>
      <span className={`${orderDetailsStyles['small-text']} mb-2 text text_type_main-small`}>Ваш заказ начали готовить</span>
      <span className={`${orderDetailsStyles['small-text']} mb-2 text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</span>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired
};

export default OrderDetails;
