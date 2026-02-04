import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { usePosts } from '../../hooks/usePosts';
import Header from '../../components/posts/Header';
import CreatePost from '../../components/posts/CreatePost';
import PostList from '../../components/posts/PostList';
import DeleteModal from '../../components/posts/DeleteModal';
import styles from './Main.module.css';

function Main() {
  const { username } = useUser();
  const { posts, loading, createPost, deletePost } = usePosts();

  const [deletingPost, setDeletingPost] = useState(null);

  const handleCreate = async (title, content) => {
    await createPost(username, title, content);
  };

  const handleDelete = (post) => {
    setDeletingPost(post);
  };

  const handleConfirmDelete = async () => {
    if (deletingPost) {
      await deletePost(deletingPost.id);
      setDeletingPost(null);
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <CreatePost onSubmit={handleCreate} />
        <PostList
          posts={posts}
          currentUser={username}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>

      {deletingPost && (
        <DeleteModal
          onClose={() => setDeletingPost(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default Main;
