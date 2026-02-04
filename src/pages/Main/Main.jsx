import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { usePosts } from '../../hooks/usePosts';
import styles from './Main.module.css';
import Header from '../../components/posts/Header';
import CreatePost from '../../components/posts/CreatePost';
import PostList from '../../components/posts/PostList';

function Main() {
  const { username } = useUser();
  const { posts, loading } = usePosts();
  
  return (
    <div className={styles.page}>
     <Header />
      <main className={styles.content}>
       <CreatePost />
        <PostList
          posts={posts}
          currentUser={username}
          loading={loading}
        />
      </main>

    </div>
  );
}

export default Main;
