import PostCard from '../PostCard';
import styles from './PostList.module.css';

function PostList({loading }) {
  if (loading) {
    return <div className={styles.loading}>Loading posts...</div>;
  }

  return (
    <div className={styles.list}>

        <PostCard
          key={1}
          post={"test"}
        />

    </div>
  );
}

export default PostList;
