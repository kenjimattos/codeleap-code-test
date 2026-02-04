import Modal from '../../common/Modal';
import Button from '../../common/Button';
import styles from './DeleteModal.module.css';

function DeleteModal({ onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <h2 className={styles.title}>Are you sure you want to delete this item?</h2>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
