import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { usePosts } from '../../hooks/usePosts';
import styles from './Main.module.css';
import Header from '../../components/posts/Header';
import CreatePost from '../../components/posts/CreatePost';
import PostList from '../../components/posts/PostList';
import DeleteModal from '../../components/posts/DeleteModal';

function Main() {
  const { username } = useUser();
  const { posts, loading, createPost, deletePost } = usePosts();

  const handleCreate = async (title, content) => {
    await createPost(username, title, content);
  };

  const handleDelete = async (post) => {
    await deletePost(post.id);
  };
  
  return (
    <div className={styles.page}>
     <Header />
      <main className={styles.content}>
       <CreatePost onSubmit={handleCreate}/>
        <PostList
          posts={posts}
          currentUser={username}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>

    </div>
  );
}

export default Main;
