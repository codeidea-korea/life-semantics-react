import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "@/states/modalState";

const ModalComponent = ({ id = "" }: { id?: string }) => {
  const [modal, setModal] = useRecoilState(modalState);
  // const {
  //   show = false,
  //   title = "모달창",
  //   content = "기본",
  //   saveShow = false,
  //   closeShow = false,
  //   confirmShow = false,
  //   cancelShow = false,
  //   confirmText = "확인",
  //   cancelText = "취소",
  //   onConfirmCallback = () => {},
  // } = modal;

  const handleClose = () => {
    setModal({ ...modal, show: false });

  };
  const handleClose2 = () => {
    setModal({ ...modal, show: false });
    modal.onCancelCallback();
  }


  const handleCallback = () => {
    // @ts-ignore
    modal.onConfirmCallback();

  }

  // @ts-ignore
  return (
    <React.Fragment>
      <Modal show={modal.show} onHide={handleClose} className="modal" id={id}>
        <Modal.Header closeButton>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.content}</Modal.Body>
        <Modal.Footer className="flex modalFooter">
          {modal.cancelShow && (
            <Button variant="" onClick={handleClose2}>
              {modal.cancelText}
            </Button>
          )}
          {modal.callBackShow && (
            <Button variant="" onClick={handleCallback} className="confirmBtn">
              {modal.confirmText}
            </Button>
          )}
          {!modal.callBackShow && (
            <Button variant="" onClick={handleClose}>
              {modal.confirmText}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ModalComponent;
