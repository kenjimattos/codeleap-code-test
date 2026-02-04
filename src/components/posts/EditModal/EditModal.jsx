import { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import TextInput from '../../common/TextInput';
import Button from '../../common/Button';
import styles from './EditModal.module.css';

function EditModal({ post, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave(post.id, title.trim(), content.trim());
    }
  };

  const isDisabled = !title.trim() || !content.trim();

  return (
    <Modal onClose={onClose}>
      <h2 className={styles.title}>Edit item</h2>
      <div className={styles.form}>
        <TextInput
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="Hello world"
          maxLength={256}
        />
        <TextInput
          label="Content"
          value={content}
          onChange={setContent}
          placeholder="Content here"
          multiline
          rows={4}
          maxLength={2000}
        />
      </div>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSave} disabled={isDisabled}>
          Save
        </Button>
      </div>
    </Modal>
  );
}

export default EditModal;
