import React, {FC} from 'react';

import modalOverlayStyles from './ModalOverlay.module.css';

type TModalOverlay = {
  onClick: React.MouseEventHandler
};

const ModalOverlay:FC<TModalOverlay> = (props) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default ModalOverlay;