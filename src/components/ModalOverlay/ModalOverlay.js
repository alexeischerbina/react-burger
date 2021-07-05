import PropTypes from 'prop-types';

import modalOverlayStyles from './ModalOverlay.module.css';

const ModalOverlay = (props) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired
};

export default ModalOverlay;