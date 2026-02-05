import { useState, useEffect, useCallback, useRef } from 'react';
import * as api from '../services/api';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const abortControllerRef = useRef(null);

  const hasMore = nextUrl !== null;

  const fetchPosts = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      setLoading(true);
      setError(null);
      const data = await api.getPosts(undefined, signal);
      setPosts(data.results || []);
      setNextUrl(data.next || null);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!nextUrl || loadingMore) return;

    try {
      setLoadingMore(true);
      setError(null);
      const data = await api.getPosts(nextUrl);
      setPosts(prev => [...prev, ...(data.results || [])]);
      setNextUrl(data.next || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  }, [nextUrl, loadingMore]);

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

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchPosts]);

  return {
    posts,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
}
