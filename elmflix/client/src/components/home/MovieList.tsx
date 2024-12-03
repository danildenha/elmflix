"use client";

import React, { useMemo } from 'react';
import MovieCard from './MovieCard';
import { content } from '@/lib/schema';

interface MovieListProps {
  title?: string;
  movies?: typeof content;
  selectedGenre?: string;
}

const MovieList: React.FC<MovieListProps> = ({
  title = 'All Movies',
  movies = content,
  selectedGenre = ''
}) => {
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesGenre = !selectedGenre || 
        movie.genre === selectedGenre;

      return matchesGenre;
    });
  }, [movies, selectedGenre]);

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
          {selectedGenre ? `${selectedGenre} Movies` : title}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.content_id} className="relative">
              <MovieCard movie={movie} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                <h3 className="text-white text-lg font-medium truncate">
                  {movie.title}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-white/70">
            <p className="text-lg">No movies found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
