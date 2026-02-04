import PostCard from '../PostCard';
import styles from './PostList.module.css';

function PostList({ posts, currentUser, onEdit, onDelete, loading, onLike, getLikes, isLiked, getComments, onAddComment }) {
  if (loading) {
    return <div className={styles.loading}>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className={styles.empty}>No posts yet. Be the first to post!</div>;
  }

  return (
    <div className={styles.list}>
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          isOwner={post.username === currentUser}
          onEdit={onEdit}
          onDelete={onDelete}
          likes={getLikes(post.id)}
          isLiked={isLiked(post.id)}
          onLike={onLike}
          comments={getComments(post.id)}
          onAddComment={(text) => onAddComment(post.id, text)}
        />
      ))}
    </div>
  );
}

export default PostList;
