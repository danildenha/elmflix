"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiLogOut, FiUser, FiFilter, FiSearch, FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { content } from "@/lib/schema";

interface NavigationHeaderProps {
  onSearch?: (term: string) => void;
  onGenreSelect?: (genre: string | null) => void;
}

const SearchInput = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const [value, setValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof content>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch?.(newValue);

    // Search in content array
    const results = content.filter(movie =>
      movie.title.toLowerCase().includes(newValue.toLowerCase()) ||
      movie.genre.toLowerCase().includes(newValue.toLowerCase())
    ).slice(0, 5); // Limit to 5 results

    setSearchResults(results);
    setShowResults(newValue.length > 0);
  };

  return (
    <div className="relative flex-1 max-w-md" ref={searchRef}>
      <input
        value={value}
        onChange={handleChange}
        onFocus={() => value && setShowResults(true)}
        placeholder="Search movies..."
        className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        type="text"
      />
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50" />
      
      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-zinc-900 rounded-lg shadow-lg overflow-hidden z-50">
          {searchResults.map((movie) => (
            <Link 
              href={`/movie/${movie.content_id}`} 
              key={movie.content_id}
              className="flex items-center gap-3 p-3 hover:bg-zinc-800 transition"
              onClick={() => setShowResults(false)}
            >
              <div className="relative w-16 h-9 flex-shrink-0">
                <Image
                  src={movie.thumbnail_url}
                  alt={movie.title}
                  fill
                  className="object-cover rounded"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="text-white font-medium">{movie.title}</p>
                <p className="text-white/70 text-sm">{movie.genre}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const NavigationHeader = ({ onSearch, onGenreSelect }: NavigationHeaderProps) => {
  const [mounted, setMounted] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const genreRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Get unique genres from content
  const genres = React.useMemo(() => 
    Array.from(new Set(content.map(movie => movie.genre))).sort()
  , []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (genreOpen && genreRef.current && !genreRef.current.contains(event.target as Node)) {
        setGenreOpen(false);
      }
      if (accountOpen && accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [genreOpen, accountOpen, mounted]);

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
    onGenreSelect?.(genre);
    setGenreOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/home" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center justify-center gap-8 md:flex-1">
            {/* Search Input */}
            <SearchInput onSearch={onSearch} />

            {/* Genre Filter */}
            <div className="relative" ref={genreRef}>
              <button
                onClick={() => setGenreOpen(!genreOpen)}
                className="flex items-center gap-2 text-white hover:text-white/80 transition"
              >
                <FiFilter className="w-5 h-5" />
                {selectedGenre || "All Genres"}
              </button>

              {genreOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-2">
                    <button
                      onClick={() => handleGenreSelect(null)}
                      className={`w-full text-left px-4 py-2 rounded ${
                        !selectedGenre ? 'bg-blue-500 text-white' : 'text-white hover:bg-zinc-800'
                      }`}
                    >
                      All Genres
                    </button>
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => handleGenreSelect(genre)}
                        className={`w-full text-left px-4 py-2 rounded ${
                          selectedGenre === genre ? 'bg-blue-500 text-white' : 'text-white hover:bg-zinc-800'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Menu */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="flex items-center gap-2 text-white hover:text-white/80 transition"
            >
              <FiUser className="w-5 h-5" />
              Account
            </button>

            {accountOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
                <div className="p-2">
                  <Link
                    href="/"
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-white hover:bg-zinc-800 rounded"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationHeader;
