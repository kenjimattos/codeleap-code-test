import { Trash2, Pencil } from 'lucide-react';
import styles from './PostCard.module.css';

function PostCard({ post }) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>{post.title}</h3>
          <div className={styles.actions}>
            <button
              className={styles.iconButton}
              aria-label="Delete post"
            >
              <Trash2 size={24} />
            </button>
            <button
              className={styles.iconButton}
              aria-label="Edit post"
            >
              <Pencil size={24} />
            </button>
          </div>
      </header>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.username}>@{post.username}</span>
        </div>
        <p className={styles.content}>{post.content}</p>
      </div>
    </article>
  );
}

export default PostCard;
