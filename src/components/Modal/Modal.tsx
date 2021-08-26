import React, {FC, MouseEvent} from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../ModalOverlay/ModalOverlay';
import modalStyles from './Modal.module.css';

const modalRoot = document.getElementById('react-modals') as Element;

type TModal = {
  title: string;
  onClose: () => void;
};

const Modal:FC<TModal> = (props) => {
  const {title, onClose, children} = props;
  const handlerCloseButton = React.useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  React.useEffect(() => {
    document.addEventListener('keydown', handlerCloseButton);
    return () => {
      document.removeEventListener('keydown', handlerCloseButton);
    };
  }, [handlerCloseButton]);

  const handlerClose = (e:MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return ReactDOM.createPortal((
      <ModalOverlay onClick={handlerClose}>
        <div className={`${modalStyles['inner']} pt-10 pr-10 pb-15 pl-10`}>
          <div className={`${modalStyles.header}`}>
            <h2 className={`text text_type_main-large mr-9`}>
              {title}
            </h2>
            <CloseIcon type="primary" onClick={onClose}/>
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot
  );
}

export default Modal;