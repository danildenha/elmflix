"use client";

import { useState } from 'react';
import { content } from '@/lib/schema';
import NavigationHeader from '@/components/home/NavigationHeader';
import BillboardContent from '@/components/home/BillboardContent';
import MovieList from '@/components/home/MovieList';
import WatchHistory from '@/components/home/WatchHistory';
import Watchlist from '@/components/home/Watchlist';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Filter movies based on search and genre
  const filteredMovies = content.filter(movie => {
    const matchesSearch = searchTerm === '' || 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = !selectedGenre || 
      movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <main className="relative min-h-screen bg-zinc-900 overflow-x-hidden">
      <NavigationHeader 
        onSearch={setSearchTerm}
        onGenreSelect={setSelectedGenre}
      />
      <BillboardContent />
      <div className="pb-40">
        <MovieList
          title={selectedGenre || "All Movies"}
          movies={filteredMovies}
        />
        <WatchHistory />
        <Watchlist />
      </div>
    </main>
  );
}