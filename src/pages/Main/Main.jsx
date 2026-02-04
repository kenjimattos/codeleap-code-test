import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { usePosts } from '../../hooks/usePosts';
import { useLikes } from '../../hooks/useLikes';
import { useComments } from '../../hooks/useComments';
import Header from '../../components/posts/Header';
import CreatePost from '../../components/posts/CreatePost';
import PostList from '../../components/posts/PostList';
import EditModal from '../../components/posts/EditModal';
import DeleteModal from '../../components/posts/DeleteModal';
import styles from './Main.module.css';

function Main() {
  const { username } = useUser();
  const { posts, loading, error, createPost, updatePost, deletePost } = usePosts();
  const { toggleLike, getLikes, isLiked, removeLikes } = useLikes(username);
  const { addComment, getComments, removeComments } = useComments();

  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);

  const handleCreate = async (title, content) => {
    await createPost(username, title, content);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleDelete = (post) => {
    setDeletingPost(post);
  };

  const handleSaveEdit = async (id, title, content) => {
    await updatePost(id, title, content);
    setEditingPost(null);
  };

  const handleConfirmDelete = async () => {
    if (deletingPost) {
      const postId = deletingPost.id;
      await deletePost(postId);
      removeLikes(postId);
      removeComments(postId);
      setDeletingPost(null);
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        {error && (
          <div className={styles.errorBanner}>
            {error}
          </div>
        )}
        <CreatePost onSubmit={handleCreate} />
        <PostList
          posts={posts}
          currentUser={username}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          onLike={toggleLike}
          getLikes={getLikes}
          isLiked={isLiked}
          getComments={getComments}
          onAddComment={(postId, text) => addComment(postId, username, text)}
        />
      </main>

      {editingPost && (
        <EditModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={handleSaveEdit}
        />
      )}

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
