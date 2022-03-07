import React from 'react';
import Modal from 'react-modal';

import './Modal.scss';

export default ({ isOpen, onCloseModal, body }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCloseModal}>
      {isOpen && body}
    </Modal>
  );
};
