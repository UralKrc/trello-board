import { memo } from "react";
import { createPortal } from "react-dom";
import "./styles.css";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

function Modal ({ children, onClose }: ModalProps) {
  return createPortal(
    <div className="modal-container">
      <div className="modal">
        <button onClick={onClose} className="close-button">&times;</button>
        {children}
      </div>
    </div>,
    document.getElementById('root')!
  );
};

export default memo(Modal);