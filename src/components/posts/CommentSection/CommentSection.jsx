import { useState } from 'react';
import { timeAgo } from '../../../utils/timeAgo';
import styles from './CommentSection.module.css';

function CommentSection({ comments, onAddComment }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddComment(text);
      setText('');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!text.trim()}
        >
          Post
        </button>
      </form>

      {comments.length > 0 && (
        <div className={styles.list}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <span className={styles.username}>@{comment.username}</span>
              <span className={styles.time}>{timeAgo(comment.created_datetime)}</span>
              <p className={styles.text}>{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
