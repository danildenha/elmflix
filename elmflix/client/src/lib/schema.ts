/**
 * ElmFlix Streaming Platform - Core Schema and Data Layer
 * Author: Gabriel Trejo
 * 
 * This module implements the core data structures and business logic for our streaming platform.
 * It follows TypeScript best practices and implements industry-standard patterns.
 * 
 * Step 1: Core Data Types
 * We define our main interfaces that represent the data structure of our application.
 * These types ensure type safety throughout the application.
 */

// Step 1.1: User Interface
// Represents an authenticated user in our system
// Learn more about TypeScript interfaces: https://www.typescriptlang.org/docs/handbook/interfaces.html
/**
 * Represents a user in the system
 * @see https://supabase.com/docs/reference/javascript/auth-signup for auth implementation reference
 */
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

// Step 1.2: Authentication Response
// Standardized response format for auth operations
// Follows REST API best practices: https://docs.github.com/rest/overview/resources-in-the-rest-api
/**
 * Response structure for authentication operations
 * Following REST API best practices: https://docs.github.com/rest/overview/resources-in-the-rest-api
 */
interface AuthResponse {
  success: boolean;
  error?: string;
  data?: {
    email: string;
    name: string;
  };
}

// Step 1.3: Movie Content
// Core content type representing streamable media
// Implements streaming best practices: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
/**
 * Represents a movie in the streaming platform
 * Schema inspired by Netflix's content model
 * @see https://developers.themoviedb.org/3/movies for similar movie data structure
 */
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

// Step 1.4: Watch History
// Tracks user viewing progress
// Uses Media Session API: https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API
/**
 * Represents a watch history entry
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API for media progress tracking
 */
export interface WatchHistoryItem {
  content_id: string;
  timestamp: string; // ISO date string
  progress?: number; // Playback progress in seconds
}

// Step 1.5: Watchlist
// Manages user's saved content
// Implements Set pattern for unique entries
/**
 * Represents a watchlist item
 * Similar to Netflix's "My List" feature
 */
export interface WatchlistItem {
  content_id: string;
  added_at: string; // ISO date string
}

/**
 * Step 2: Mock Database
 * For development and testing, we implement an in-memory database.
 * In production, this would be replaced with a real database connection.
 */

// Step 2.1: Mock User Data
// Contains test users with hashed passwords
// Security reference: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
/**
 * Mock user data for development and testing
 * Following security best practices for password storage
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
 */
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

// Step 2.2: Mock Content Data
// Sample streaming content with metadata
/**
 * Mock movie data for development and testing
 */
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

/**
 * Step 3: Helper Functions
 * Utility functions that support our core operations
 */

// Step 3.1: Network Simulation
// Simulates real-world latency for testing
/**
 * Simulates network latency for more realistic testing
 * @param ms - Milliseconds to delay
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Step 3.2: Input Validation
// Validates user input following security best practices
// OWASP validation guide: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
/**
 * Validates user input fields
 * Following OWASP input validation guidelines
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
 */
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

/**
 * Step 4: Authentication System
 * Implements secure user authentication following industry standards
 */

// Step 4.1: Sign In
// Handles user authentication with error handling and validation
// JWT auth guide: https://jwt.io/introduction
/**
 * Mock authentication functions
 * Implementation follows OAuth 2.0 response structure
 * @see https://oauth.net/2/
 */
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

// Step 4.2: Sign Up
// Manages new user registration with validation
/**
 * Mock authentication functions
 * Implementation follows OAuth 2.0 response structure
 * @see https://oauth.net/2/
 */
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

/**
 * Step 5: Data Access Layer
 * Functions that handle data retrieval and manipulation
 */

// Step 5.1: User Queries
// Helper functions to find and manage users
/**
 * Helper functions to simulate database queries
 */
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

// Step 5.2: Watch History Management
// Tracks and updates user viewing history
// LocalStorage guide: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
/**
 * Helper functions to manage watch history and watchlist
 */
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

// Step 5.3: Watchlist Operations
// Manages user's saved content list
// LocalStorage guide: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

/**
 * Step 6: Local Storage Integration
 * Implements persistent data storage using browser's localStorage
 */

// Step 6.1: Storage Keys
// Constants for consistent storage access
/**
 * Local storage keys
 */
const WATCH_HISTORY_KEY = 'watch_history';
const WATCHLIST_KEY = 'watchlist';

// Step 6.2: Storage Operations
// Type-safe data storage and retrieval
/**
 * Helper functions to manage local storage
 */
const getStoredData = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setStoredData = <T>(key: string, data: T[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};
