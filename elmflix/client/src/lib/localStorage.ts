/**
 * ElmFlix Local Storage Management
 * Author: Gabriel Trejo
 * 
 * This module handles persistent data storage using the browser's localStorage API.
 * It implements FIFO queues for watch history and set-based storage for watchlists.
 * 
 * Step 1: Storage Keys
 * We define consistent keys for localStorage access to prevent naming conflicts
 */

// Step 1.1: Define Storage Keys
// Using prefixed keys to avoid namespace collisions
const WATCH_HISTORY_KEY = 'elmflex_watch_history';
const WATCHLIST_KEY = 'elmflex_watchlist';

/**
 * Step 2: Watch History Management
 * Implements a FIFO queue pattern for tracking recently watched content
 * Learn more: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */

/**
 * Step 2.1: Retrieve Watch History
 * Gets the user's watch history with SSR safety check
 * @returns Array of movie IDs in chronological order (most recent first)
 */
export const getPlayHistory = (): string[] => {
  if (typeof window === 'undefined') return [];
  const history = localStorage.getItem(WATCH_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

/**
 * Step 2.2: Update Watch History
 * Implements FIFO queue with a 20-item limit
 * @param movieId - Unique identifier of the movie
 */
export const addToPlayHistory = (movieId: string) => {
  if (typeof window === 'undefined') return;
  const history = getPlayHistory();
  if (!history.includes(movieId)) {
    history.unshift(movieId); // Add to beginning
    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(history.slice(0, 20))); // Keep last 20
  }
};

/**
 * Step 3: Watchlist Management
 * Implements a set-based structure for unique movie entries
 */

/**
 * Step 3.1: Retrieve Watchlist
 * Gets user's saved movies with SSR safety check
 * @returns Array of movie IDs in the watchlist
 */
export const getWatchlist = (): string[] => {
  if (typeof window === 'undefined') return [];
  const watchlist = localStorage.getItem(WATCHLIST_KEY);
  return watchlist ? JSON.parse(watchlist) : [];
};

/**
 * Step 3.2: Add to Watchlist
 * Ensures no duplicate entries
 * @param movieId - Unique identifier of the movie
 */
export const addToWatchlist = (movieId: string) => {
  if (typeof window === 'undefined') return;
  const watchlist = getWatchlist();
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }
};

/**
 * Step 3.3: Remove from Watchlist
 * Removes movie while maintaining list integrity
 * @param movieId - Unique identifier of the movie to remove
 */
export const removeFromWatchlist = (movieId: string) => {
  if (typeof window === 'undefined') return;
  const watchlist = getWatchlist();
  const index = watchlist.indexOf(movieId);
  if (index > -1) {
    watchlist.splice(index, 1);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }
};

/**
 * Step 3.4: Check Watchlist
 * Efficiently checks if a movie is bookmarked
 * @param movieId - Unique identifier of the movie to check
 * @returns boolean indicating if the movie is in the watchlist
 */
export const isInWatchlist = (movieId: string): boolean => {
  return getWatchlist().includes(movieId);
};
