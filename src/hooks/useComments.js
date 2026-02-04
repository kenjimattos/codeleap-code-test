import { useState, useCallback } from 'react';

const STORAGE_KEY = 'codeleap_comments';

function getCommentsFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveCommentsToStorage(comments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

export function useComments() {
  const [commentsData, setCommentsData] = useState(getCommentsFromStorage);

  const addComment = useCallback((postId, username, text) => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
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

  return { addComment, getComments };
}
