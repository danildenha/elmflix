// Mock database for testing and development

// Types
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

interface AuthResponse {
  success: boolean;
  error?: string;
  data?: {
    email: string;
    name: string;
  };
}

export interface Movie {
  content_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  genre: string;
  rating: number;
  release_date: string;
  duration: string; // Format: "2h 30m" or "1h 45m"
  last_watched?: string; // ISO date string
  added_to_list?: string; // ISO date string
}

export interface WatchHistoryItem {
  content_id: string;
  timestamp: string; // ISO date string
  progress?: number; // Playback progress in seconds
}

export interface WatchlistItem {
  content_id: string;
  added_at: string; // ISO date string
}

interface Review {
  review_id: number;
  user_id: string;
  content_id: number;
  review_text: string;
  rating: number;
  created_at: string;
}

const users: User[] = [
  {
    id: '1',
    email: 'test@test.com',
    password: 'password123',
    name: 'Test User',
    createdAt: new Date('2024-11-30 12:00:00'),
  },
  {
    id: '2',
    email: 'jane.doe@gmail.com',
    password: 'hashedPassword456',
    name: 'Jane Doe',
    createdAt: new Date('2024-11-29 10:00:00'),
  },
];

export const content: Movie[] = [
  {
    content_id: "1",
    title: "The Matrix",
    description: "A computer programmer discovers a mysterious world of digital reality while searching for the truth about artificial intelligence.",
    thumbnail_url: "https://media.wired.com/photos/5ca648a330f00e47fd82ae77/master/pass/Culture_Matrix_Code_corridor.jpg",
    video_url: "https://example.com/matrix.mp4",
    genre: "Sci-Fi",
    rating: 8.7,
    release_date: "1999-03-31",
    duration: "2h 16m"
  },
  {
    content_id: "2",
    title: "Inception",
    description: "A thief who enters the dreams of others to steal secrets from their subconscious is offered a chance to regain his old life in exchange for a task considered impossible.",
    thumbnail_url: "https://www.syfy.com/sites/syfy/files/wire/legacy/inception-movie-image-38.jpg",
    video_url: "https://example.com/inception.mp4",
    genre: "Sci-Fi",
    rating: 8.8,
    release_date: "2010-07-16",
    duration: "2h 28m"
  },
  {
    content_id: "3",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine.",
    thumbnail_url: "https://picsum.photos/800/450?random=3",
    video_url: "https://example.com/pulp-fiction.mp4",
    genre: "Crime",
    rating: 8.9,
    release_date: "2023-11-20",
    duration: "2h 34m"
  },
  {
    content_id: "4",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.",
    thumbnail_url: "https://picsum.photos/800/450?random=2",
    video_url: "https://example.com/dark-knight.mp4",
    genre: "Action",
    rating: 9.0,
    release_date: "2023-12-15",
    duration: "2h 32m"
  },
  {
    content_id: "5",
    title: "Forrest Gump",
    description: "The life journey of a man who unknowingly influences several historical events.",
    thumbnail_url: "https://picsum.photos/800/450?random=5",
    video_url: "https://example.com/forrest-gump.mp4",
    genre: "Drama",
    rating: 8.8,
    release_date: "2023-09-15",
    duration: "2h 22m"
  },
];

let watchHistory: WatchHistoryItem[] = [];
let watchlist: WatchlistItem[] = [];

const reviews: Review[] = [
  {
    review_id: 1,
    user_id: '1',
    content_id: 1,
    review_text: "Amazing adventure!",
    rating: 8.0,
    created_at: "2024-11-30 17:00:00",
  },
  {
    review_id: 2,
    user_id: '2',
    content_id: 2,
    review_text: "Absolutely thrilling!",
    rating: 9.5,
    created_at: "2024-11-29 21:00:00",
  },
];

// Helper function to simulate database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Validation helpers
export const validateField = (field: string, value: string): string => {
  switch (field) {
    case 'name':
      if (!value) return 'Name is required';
      return '';
    case 'email':
      if (!value) return 'Email is required';
      if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Please enter a valid email';
      return '';
    case 'password':
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return '';
    default:
      return '';
  }
};

// Mock authentication functions
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  await delay(1000); // Simulate network delay

  // Mock validation
  if (email !== 'test@test.com') {
    return {
      success: false,
      error: 'Email not found'
    };
  }

  if (password !== 'password123') {
    return {
      success: false,
      error: 'Incorrect password'
    };
  }

  return {
    success: true,
    data: {
      email,
      name: 'Test User'
    }
  };
};

export const signUp = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  await delay(1000); // Simulate network delay

  // Mock validation - in real app this would check against a database
  if (email === 'test@test.com') {
    return {
      success: false,
      error: 'Email already exists'
    };
  }

  return {
    success: true,
    data: {
      email,
      name
    }
  };
};

// Helper functions to simulate database queries
export const findUserByEmail = (email: string) => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: string) => {
  return users.find(user => user.id === id);
};

// export const getUserWatchlist = (userId: string) => {
//   return watchlist
//     .filter(item => item.user_id === userId)
//     .map(item => ({
//       ...item,
//       content: content.find(c => c.content_id === item.content_id)
//     }));
// };
//
// export const getUserHistory = (userId: string) => {
//   return watchHistory
//     .filter(item => item.user_id === userId)
//     .map(item => ({
//       ...item,
//       content: content.find(c => c.content_id === item.content_id)
//     }));
// };

export const getContentReviews = (contentId: number) => {
  return reviews
    .filter(review => review.content_id === contentId)
    .map(review => ({
      ...review,
      user: users.find(u => u.id === review.user_id)
    }));
};

// Helper functions
export const addToWatchHistory = (contentId: string) => {
  const history = getWatchHistory();
  const timestamp = new Date().toISOString();
  
  // Remove existing entry if present
  const updatedHistory = history.filter(item => item.content_id !== contentId);
  
  // Add new entry at the beginning
  updatedHistory.unshift({ content_id: contentId, timestamp });
  setStoredData(WATCH_HISTORY_KEY, updatedHistory);
  
  // Update movie's last_watched
  const movie = content.find(m => m.content_id === contentId);
  if (movie) {
    movie.last_watched = timestamp;
  }
};

export const getLastWatched = (contentId: string): string | undefined => {
  const history = getWatchHistory();
  const item = history.find(h => h.content_id === contentId);
  return item?.timestamp;
};

export const getWatchHistory = (): WatchHistoryItem[] => {
  return getStoredData<WatchHistoryItem>(WATCH_HISTORY_KEY);
};

export const getWatchlist = (): WatchlistItem[] => {
  return getStoredData<WatchlistItem>(WATCHLIST_KEY);
};

export const addToWatchlist = (contentId: string) => {
  const watchlist = getWatchlist();
  const timestamp = new Date().toISOString();
  
  if (!isInWatchlist(contentId)) {
    watchlist.unshift({ content_id: contentId, added_at: timestamp });
    setStoredData(WATCHLIST_KEY, watchlist);
    
    // Update movie's added_to_list
    const movie = content.find(m => m.content_id === contentId);
    if (movie) {
      movie.added_to_list = timestamp;
    }
  }
};

export const removeFromWatchlist = (contentId: string) => {
  const watchlist = getWatchlist();
  const updatedWatchlist = watchlist.filter(item => item.content_id !== contentId);
  setStoredData(WATCHLIST_KEY, updatedWatchlist);
  
  // Remove added_to_list from movie
  const movie = content.find(m => m.content_id === contentId);
  if (movie) {
    delete movie.added_to_list;
  }
};

export const isInWatchlist = (contentId: string): boolean => {
  const watchlist = getWatchlist();
  return watchlist.some(item => item.content_id === contentId);
};

export const getMovieData = (contentId: string): Movie | undefined => {
  const movie = content.find(m => m.content_id === contentId);
  if (!movie) return undefined;
  
  // Get additional data
  const lastWatched = getLastWatched(contentId);
  const inWatchlist = isInWatchlist(contentId);
  
  return {
    ...movie,
    last_watched: lastWatched,
    added_to_list: inWatchlist ? getWatchlist().find(w => w.content_id === contentId)?.added_at : undefined
  };
};

// Local storage keys
const WATCH_HISTORY_KEY = 'watch_history';
const WATCHLIST_KEY = 'watchlist';

// Helper functions
const getStoredData = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setStoredData = <T>(key: string, data: T[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};
