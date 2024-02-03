import { createPortal } from "react-dom";
import "./styles.css";
interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
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

export default Modal;