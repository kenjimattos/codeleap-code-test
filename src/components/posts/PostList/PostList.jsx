import PostCard from '../PostCard';
import styles from './PostList.module.css';

function PostList({posts,loading}) {
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
        />
      ))}
    </div>
  );
}

export default PostList;
