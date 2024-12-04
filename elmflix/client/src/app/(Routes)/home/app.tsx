"use client";

import React, { useState, useEffect } from 'react';
import NavigationHeader from '@/components/home/NavigationHeader';
import { content } from '@/lib/schema';

interface Movie {
  content_id: number;
  title: string;
  description: string;
  genre: string;
  release_date: string;
  rating: number;
  thumbnail_url: string;
  video_url: string;
}

// Function to convert content to Movie type
const convertToMovie = (data: any): Movie[] => {
  return data.map((item: any) => ({
    content_id: Number(item.content_id),
    title: item.title,
    description: item.description,
    genre: item.genre,
    release_date: item.release_date,
    rating: item.rating,
    thumbnail_url: item.thumbnail_url,
    video_url: item.video_url,
  }));
};

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Initialize movies from schema
  useEffect(() => {
    const moviesData = convertToMovie(content);
    setMovies(moviesData);
    setFilteredMovies(moviesData);
  }, []);

  // Filter movies based on search term and genre
  const filterMovies = (search: string, genre: string | null) => {
    let filtered = [...movies];

    // Filter by search term
    if (search) {
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by genre
    if (genre) {
      filtered = filtered.filter(movie => 
        movie.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    setFilteredMovies(filtered);
  };

  // Handle search input change
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterMovies(term, selectedGenre);
  };

  // Handle genre selection
  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
    filterMovies(searchTerm, genre);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationHeader onSearch={handleSearch} onGenreSelect={handleGenreSelect} />
      
      {/* Movies Grid */}
      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div 
              key={movie.content_id} 
              className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
            >
              {/* <img 
                src={movie.thumbnail_url} 
                alt={movie.title}
                className="w-full h-48 object-cover"
              /> */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{movie.genre}</p>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {movie.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
