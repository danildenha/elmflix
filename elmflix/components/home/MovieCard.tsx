"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiPlay, FiPlus, FiCheck } from 'react-icons/fi';
import { Movie, addToWatchHistory, addToWatchlist, removeFromWatchlist, isInWatchlist } from '@/lib/schema';
import MovieInfoModal from './MovieInfoModal';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [inList, setInList] = useState(false);

  useEffect(() => {
    setInList(isInWatchlist(movie.content_id));
  }, [movie.content_id]);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToWatchHistory(movie.content_id);
    window.alert(`Playing: ${movie.title}\nVideo URL: ${movie.video_url}`);
  };

  const handleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inList) {
      removeFromWatchlist(movie.content_id);
      setInList(false);
    } else {
      addToWatchlist(movie.content_id);
      setInList(true);
    }
  };

  return (
    <>
      <div 
        className="group relative h-[12vw] min-h-[180px] cursor-pointer transition duration-200 ease-out"
        onClick={() => setShowModal(true)}
      >
        <Image
          src={movie.thumbnail_url}
          alt={movie.title}
          fill
          className="rounded-md object-cover transition duration-200 shadow-xl group-hover:opacity-90"
        />
        
        <div className="invisible absolute top-0 z-10 w-full h-full rounded-md 
                      opacity-0 transition duration-200 
                      group-hover:visible group-hover:opacity-100
                      bg-zinc-900/70">
          <div className="flex flex-col justify-center items-center h-full gap-3">
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md 
                       hover:bg-white/90 transition w-3/4 justify-center"
            >
              <FiPlay className="w-4 h-4" />
              Play
            </button>
            
            <button
              onClick={handleWatchlist}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition w-3/4 justify-center
                        ${inList 
                          ? 'bg-white text-black hover:bg-white/90' 
                          : 'border-2 border-white text-white hover:bg-white/10'
                        }`}
            >
              {inList ? (
                <>
                  <FiCheck className="w-4 h-4" />
                  In List
                </>
              ) : (
                <>
                  <FiPlus className="w-4 h-4" />
                  Add to List
                </>
              )}
            </button>

            <div className="absolute bottom-2 left-2 text-white text-sm">
              <div className="font-semibold">{movie.title}</div>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span>{movie.duration}</span>
                <span>•</span>
                <span>{movie.genre}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <MovieInfoModal
          movie={movie}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default MovieCard;
