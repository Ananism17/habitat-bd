import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoMdClose } from "react-icons/io";

const PopupComponent = ({ show, handleClose, title, bodyText }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered contentClassName="popup">
        <Modal.Header>
          <Button
            variant="outline-secondary"
            className="position-absolute top-0 end-0 me-3 glass-button"
            onClick={handleClose}
            style={{ marginTop: "12px" }}
          >
            <IoMdClose />
          </Button>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyText}</Modal.Body>
      </Modal>
    </>
  );
};

export default PopupComponent;
