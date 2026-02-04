import PostCard from '../PostCard';
import Button from '../../common/Button';
import styles from './PostList.module.css';

function PostList({
  posts,
  currentUser,
  onEdit,
  onDelete,
  loading,
  loadingMore,
  hasMore,
  onLoadMore,
  onLike,
  getLikes,
  isLiked,
  getComments,
  onAddComment
}) {
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
      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <Button
            variant="secondary"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default PostList;
