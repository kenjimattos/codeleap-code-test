import styles from './Modal.module.css';

function Modal({ children, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
