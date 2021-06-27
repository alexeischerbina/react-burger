import PropTypes from 'prop-types';

import orderDetailsStyles from './OrderDetails.module.css';
import doneImg from '../../images/done.png';

const OrderDetails = (props) => {
  const {orderData} = props;
  return (
    <div className={`${orderDetailsStyles.container} mb-15`}>
      <span className={`${orderDetailsStyles.number} mt-4 mb-8 text text_type_digits-large`}>{orderData.number}</span>
      <span className="mb-15 text text_type_main-medium">идентификатор заказа</span>
      <img src={doneImg} alt={orderData.status} className="mb-15"></img>
      <span className={`${orderDetailsStyles['small-text']} mb-2 text text_type_main-small`}>{orderData.statusDescription}</span>
      <span className={`${orderDetailsStyles['small-text']} mb-2 text text_type_main-small text_color_inactive`}>{orderData.statusCommand}</span>
    </div>
  );
}

OrderDetails.propTypes = {
  orderData: PropTypes.shape({
    number: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    statusDescription: PropTypes.string.isRequired,
    statusCommand: PropTypes.string.isRequired
    }).isRequired
};

export default OrderDetails;
