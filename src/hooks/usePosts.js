import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getPosts();
      setPosts(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (username, title, content) => {
    try {
      setError(null);
      await api.createPost(username, title, content);
      await fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  }, [fetchPosts]);

  const updatePost = useCallback(async (id, title, content) => {
    try {
      setError(null);
      await api.updatePost(id, title, content);
      await fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  }, [fetchPosts]);

  const deletePost = useCallback(async (id) => {
    try {
      setError(null);
      await api.deletePost(id);
      await fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
}
