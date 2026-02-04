import { Trash2, Pencil, Heart } from 'lucide-react';
import { timeAgo } from '../../../utils/timeAgo';
import CommentSection from '../CommentSection';
import styles from './PostCard.module.css';

function PostCard({ post, isOwner, onEdit, onDelete, likes, isLiked, onLike, comments, onAddComment }) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>{post.title}</h3>
        {isOwner && (
          <div className={styles.actions}>
            <button
              className={styles.iconButton}
              onClick={() => onDelete(post)}
              aria-label="Delete post"
            >
              <Trash2 size={24} />
            </button>
            <button
              className={styles.iconButton}
              onClick={() => onEdit(post)}
              aria-label="Edit post"
            >
              <Pencil size={24} />
            </button>
          </div>
        )}
      </header>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.username}>@{post.username}</span>
          <span className={styles.time}>{timeAgo(post.created_datetime)}</span>
        </div>
        <p className={styles.content}>{post.content}</p>
        <div className={styles.likeSection}>
          <button
            className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
            onClick={() => onLike(post.id)}
            aria-label={isLiked ? 'Unlike post' : 'Like post'}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{likes}</span>
          </button>
        </div>
        <CommentSection
          comments={comments}
          onAddComment={onAddComment}
        />
      </div>
    </article>
  );
}

export default PostCard;
