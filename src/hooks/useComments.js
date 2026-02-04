import { useState, useCallback } from 'react';

const STORAGE_KEY = 'codeleap_comments';

function getCommentsFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveCommentsToStorage(comments) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch {
    // Storage full or unavailable (e.g., private browsing)
  }
}

export function useComments() {
  const [commentsData, setCommentsData] = useState(getCommentsFromStorage);

  const addComment = useCallback((postId, username, text) => {
    if (!text.trim()) return;

    const newComment = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      username,
      text: text.trim(),
      created_datetime: new Date().toISOString(),
    };

    setCommentsData((prev) => {
      const postComments = prev[postId] || [];
      const updated = {
        ...prev,
        [postId]: [...postComments, newComment],
      };
      saveCommentsToStorage(updated);
      return updated;
    });
  }, []);

  const getComments = useCallback((postId) => {
    return commentsData[postId] || [];
  }, [commentsData]);

  const removeComments = useCallback((postId) => {
    setCommentsData((prev) => {
      const { [postId]: _, ...rest } = prev;
      saveCommentsToStorage(rest);
      return rest;
    });
  }, []);

  return { addComment, getComments, removeComments };
}
