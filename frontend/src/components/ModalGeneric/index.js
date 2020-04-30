import { Modal, Button } from "antd";
import React, { Children } from "react";

export const ModalGeneric = ({ title, visible, onOk, onCancel, children }) => {
  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      {children}
    </Modal>
  );
};

export default ModalGeneric;
