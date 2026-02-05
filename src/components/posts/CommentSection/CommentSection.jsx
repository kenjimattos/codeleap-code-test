import { useState } from 'react';
import { timeAgo } from '../../../utils/timeAgo';
import styles from './CommentSection.module.css';

function CommentSection({ postId, comments, onAddComment }) {
  const [text, setText] = useState('');
  const inputId = `comment-input-${postId}`;

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
        <label htmlFor={inputId} className={styles.srOnly}>
          Write a comment
        </label>
        <input
          id={inputId}
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
