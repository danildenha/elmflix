// Constants for localStorage keys
const WATCH_HISTORY_KEY = 'elmflex_watch_history';
const WATCHLIST_KEY = 'elmflex_watchlist';

// Watch History functions
export const getPlayHistory = (): string[] => {
  if (typeof window === 'undefined') return [];
  const history = localStorage.getItem(WATCH_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

export const addToPlayHistory = (movieId: string) => {
  if (typeof window === 'undefined') return;
  const history = getPlayHistory();
  if (!history.includes(movieId)) {
    history.unshift(movieId); // Add to beginning
    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(history.slice(0, 20))); // Keep last 20
  }
};

// Watchlist functions
export const getWatchlist = (): string[] => {
  if (typeof window === 'undefined') return [];
  const watchlist = localStorage.getItem(WATCHLIST_KEY);
  return watchlist ? JSON.parse(watchlist) : [];
};

export const addToWatchlist = (movieId: string) => {
  if (typeof window === 'undefined') return;
  const watchlist = getWatchlist();
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }
};

export const removeFromWatchlist = (movieId: string) => {
  if (typeof window === 'undefined') return;
  const watchlist = getWatchlist();
  const index = watchlist.indexOf(movieId);
  if (index > -1) {
    watchlist.splice(index, 1);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }
};

export const isInWatchlist = (movieId: string): boolean => {
  return getWatchlist().includes(movieId);
};
