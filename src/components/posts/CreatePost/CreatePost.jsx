import { useState } from 'react';
import Button from '../../common/Button';
import TextInput from '../../common/TextInput';
import styles from './CreatePost.module.css';

function CreatePost({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
      setTitle('');
      setContent('');
    }
  };

  const isDisabled = !title.trim() || !content.trim();

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <h2 className={styles.title}>What&apos;s on your mind?</h2>
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
      <div className={styles.actions}>
        <Button type="submit" disabled={isDisabled}>
          Create
        </Button>
      </div>
    </form>
  );
}

export default CreatePost;
