"use client";

import { useEffect, useState } from 'react';
import { Movie, getWatchHistory, content } from '@/lib/schema';
import MovieCard from './MovieCard';

const WatchHistory = () => {
  const [mounted, setMounted] = useState(false);
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const history = getWatchHistory();
    const movies = history
      .map(item => content.find(movie => movie.content_id === item.content_id))
      .filter((movie): movie is Movie => movie !== undefined)
      .sort((a, b) => {
        const aDate = a.last_watched || '';
        const bDate = b.last_watched || '';
        return bDate.localeCompare(aDate); // Most recently watched first
      });

    setWatchedMovies(movies);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          Watch History
        </p>
        {watchedMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/70">
            <p className="text-lg">Your watch history is empty</p>
            <p className="text-sm mt-2">Movies you watch will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mb-4">
            {watchedMovies.map((movie) => (
              <MovieCard 
                key={`${movie.content_id}-${movie.last_watched}`} 
                movie={movie} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchHistory;