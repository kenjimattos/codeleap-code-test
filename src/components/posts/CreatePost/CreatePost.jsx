import { useState } from 'react';
import Button from '../../common/Button';
import TextInput from '../../common/TextInput';
import styles from './CreatePost.module.css';

function CreatePost({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isDisabled = !title.trim() || !content.trim();

  return (
    <form className={styles.card}>
      <h2 className={styles.title}>What's on your mind?</h2>
      <TextInput
        label="Title"
        value={title}
        onChange={setTitle}
        placeholder="Hello world"
      />
      <TextInput
        label="Content"
        value={content}
        onChange={setContent}
        placeholder="Content here"
        multiline
        rows={4}
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
