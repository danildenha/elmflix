export type ProfileType = 'kids' | 'teen' | 'adult';

export interface Profile {
  id: string;
  name: string;
  age: number;
  type: ProfileType;
  imageUrl?: string;
  createdAt: Date;
  isKidsProfile: boolean;
  maturitySettings: {
    maxRating: string; // e.g., 'G', 'PG', 'PG-13', 'R'
    parentalControls: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  password: string;
  profiles: Profile[];
  createdAt: Date;
  settings: {
    maxProfiles: number;
    parentalControlPin?: string;
  };
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  data?: {
    email: string;
    profiles: Profile[];
  };
}





export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  genre: string[];
}

export interface Profile {
  id: string;
  name: string;
  imageUrl?: string;
}

export const TRENDING_MOVIES: Movie[] = [
  {
    id: '1',
    title: "Elephant's Dream",
    description: "Friends Proog and Emo journey inside the folds of a seemingly infinite Machine.",
    thumbnailUrl: '/movies/elephants-dream.jpg',
    genre: ['Animation', 'Sci-Fi']
  },
  {
    id: '2',
    title: 'Big Buck Bunny',
    description: 'A giant rabbit with a heart of gold stands up to forest bullies.',
    thumbnailUrl: '/movies/big-buck-bunny.jpg',
    genre: ['Animation', 'Comedy']
  },
  {
    id: '3',
    title: 'Sintel',
    description: 'A lonely young woman seeks out her lost friend.',
    thumbnailUrl: '/movies/sintel.jpg',
    genre: ['Animation', 'Adventure']
  },
  {
    id: '4',
    title: 'Spring',
    description: 'A story about new beginnings and fresh starts.',
    thumbnailUrl: '/movies/spring.jpg',
    genre: ['Drama', 'Romance']
  }
];

export const MY_LIST: Movie[] = [
  {
    id: '3',
    title: 'Sintel',
    description: 'A lonely young woman seeks out her lost friend.',
    thumbnailUrl: '/movies/sintel.jpg',
    genre: ['Animation', 'Adventure']
  }
];
