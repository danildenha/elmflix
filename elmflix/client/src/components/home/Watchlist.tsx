"use client";

import { useEffect, useState } from 'react';
import { Movie, getWatchlist, content } from '@/lib/schema';
import MovieCard from './MovieCard';

const Watchlist = () => {
  const [mounted, setMounted] = useState(false);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const watchlist = getWatchlist();
    const movies = watchlist
      .map(item => content.find(movie => movie.content_id === item.content_id))
      .filter((movie): movie is Movie => movie !== undefined)
      .sort((a, b) => {
        const aDate = a.added_to_list || '';
        const bDate = b.added_to_list || '';
        return bDate.localeCompare(aDate); // Most recently added first
      });

    setWatchlistMovies(movies);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          My List
        </p>
        {watchlistMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/70">
            <p className="text-lg">Your watchlist is empty</p>
            <p className="text-sm mt-2">Add movies to your list to watch them later</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mb-4">
            {watchlistMovies.map((movie) => (
              <MovieCard key={movie.content_id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;