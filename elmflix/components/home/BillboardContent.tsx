"use client";

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { FiPlay, FiInfo, FiPlus, FiCheck } from 'react-icons/fi';
import { Movie, content, addToWatchHistory, addToWatchlist, removeFromWatchlist, isInWatchlist } from '@/lib/schema';
import MovieInfoModal from './MovieInfoModal';

const BillboardContent = () => {
  const [mounted, setMounted] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  // Get random movie
  const getRandomMovie = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * content.length);
    return content[randomIndex];
  }, []);

  // Initialize with a random movie and set up interval
  useEffect(() => {
    const movie = getRandomMovie();
    setCurrentMovie(movie);
    if (movie) {
      setInWatchlist(isInWatchlist(movie.content_id));
    }
    setMounted(true);

    // Set up interval for changing movies
    const interval = setInterval(() => {
      const newMovie = getRandomMovie();
      setCurrentMovie(newMovie);
      if (newMovie) {
        setInWatchlist(isInWatchlist(newMovie.content_id));
      }
    }, 6000); // 6 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [getRandomMovie]);

  const handlePlay = () => {
    if (!currentMovie) return;
    addToWatchHistory(currentMovie.content_id);
    window.alert(`Playing: ${currentMovie.title}\nVideo URL: ${currentMovie.video_url}`);
  };

  const handleWatchlist = () => {
    if (!currentMovie) return;
    
    if (inWatchlist) {
      removeFromWatchlist(currentMovie.content_id);
      setInWatchlist(false);
    } else {
      addToWatchlist(currentMovie.content_id);
      setInWatchlist(true);
    }
  };

  if (!mounted || !currentMovie) return null;

  return (
    <>
      <div className="relative h-[56.25vw]">
        <Image
          src={currentMovie.thumbnail_url}
          alt={currentMovie.title}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/60 to-zinc-900" />
        
        {/* Content */}
        <div className="absolute bottom-[25%] left-0 right-0 px-4 md:px-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {currentMovie.title}
            </h1>
            
            <p className="text-white/90 text-lg md:text-xl mb-6 line-clamp-3">
              {currentMovie.description}
            </p>
            
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={handlePlay}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md hover:bg-white/90 transition"
              >
                <FiPlay className="w-5 h-5" />
                Play
              </button>
              
              <button 
                onClick={() => setShowInfoModal(true)}
                className="flex items-center gap-2 bg-zinc-700/80 text-white px-6 py-3 rounded-md hover:bg-zinc-700/60 transition"
              >
                <FiInfo className="w-5 h-5" />
                More Info
              </button>

              <button
                onClick={handleWatchlist}
                className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white/10 transition"
              >
                {inWatchlist ? (
                  <>
                    <FiCheck className="w-5 h-5" />
                    In My List
                  </>
                ) : (
                  <>
                    <FiPlus className="w-5 h-5" />
                    Add to List
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Info Modal */}
      {showInfoModal && (
        <MovieInfoModal
          movie={currentMovie}
          onClose={() => setShowInfoModal(false)}
        />
      )}
    </>
  );
};

export default BillboardContent;
