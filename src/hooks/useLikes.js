import { useState, useCallback } from 'react';

const STORAGE_KEY = 'codeleap_likes';

function getLikesFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveLikesToStorage(likes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
  } catch {
    // Storage full or unavailable (e.g., private browsing)
  }
}

export function useLikes(username) {
  const [likesData, setLikesData] = useState(getLikesFromStorage);

  const toggleLike = useCallback((postId) => {
    setLikesData((prev) => {
      const postLikes = prev[postId] || { count: 0, users: [] };
      const hasLiked = postLikes.users.includes(username);

      const updated = {
        ...prev,
        [postId]: {
          count: hasLiked ? postLikes.count - 1 : postLikes.count + 1,
          users: hasLiked
            ? postLikes.users.filter((u) => u !== username)
            : [...postLikes.users, username],
        },
      };

      saveLikesToStorage(updated);
      return updated;
    });
  }, [username]);

  const getLikes = useCallback((postId) => {
    return likesData[postId]?.count || 0;
  }, [likesData]);

  const isLiked = useCallback((postId) => {
    return likesData[postId]?.users.includes(username) || false;
  }, [likesData, username]);

  return { toggleLike, getLikes, isLiked };
}
