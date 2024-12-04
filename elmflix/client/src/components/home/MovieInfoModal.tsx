"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FiX,
  FiPlay,
  FiPlus,
  FiCheck,
  FiSearch,
} from "react-icons/fi";
import {
  Movie,
  addToWatchHistory,
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  content,
} from "@/lib/schema";

interface MovieInfoModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieInfoModal: React.FC<MovieInfoModalProps> = ({ movie, onClose }) => {
  const [inList, setInList] = useState(() => isInWatchlist(movie.content_id));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const handlePlay = useCallback(() => {
    addToWatchHistory(movie.content_id);
    window.alert(`Playing: ${movie.title}\nVideo URL: ${movie.video_url}`);
  }, [movie]);

  const handleWatchlist = useCallback(() => {
    if (inList) {
      removeFromWatchlist(movie.content_id);
      setInList(false);
    } else {
      addToWatchlist(movie.content_id);
      setInList(true);
    }
  }, [movie.content_id, inList]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = content.filter(
        (m) =>
            m.title.toLowerCase().includes(query.toLowerCase()) ||
            m.description.toLowerCase().includes(query.toLowerCase()) ||
            m.genre.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div
            ref={modalRef}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-lg shadow-lg"
        >
          {/* Close button */}
          <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white hover:text-gray-300"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Search bar */}
          <div className="absolute right-14 top-4 flex items-center">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-zinc-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>

          {/* Movie content */}
          <div className="relative pt-[56.25%]">
            <img
                src={movie.thumbnail_url}
                alt={movie.title}
                className="absolute top-0 w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-4">{movie.title}</h2>

            <div className="flex gap-4 mb-6">
              <button
                  onClick={handlePlay}
                  className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-md hover:bg-white/90 transition"
              >
                <FiPlay className="w-5 h-5" />
                Play
              </button>

              <button
                  onClick={handleWatchlist}
                  className="flex items-center gap-2 border-2 border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition"
              >
                {inList ? (
                    <>
                      <FiCheck className="w-5 h-5" />
                      In List
                    </>
                ) : (
                    <>
                      <FiPlus className="w-5 h-5" />
                      Add to List
                    </>
                )}
              </button>
            </div>

            <div className="text-white/70 text-sm mb-4">
              <span>{movie.release_date.split("-")[0]}</span>
              <span className="mx-2">•</span>
              <span>{movie.duration}</span>
              <span className="mx-2">•</span>
              <span>{movie.genre}</span>
            </div>

            <p className="text-white/90 mb-6">{movie.description}</p>

            {/* Search results */}
            {searchResults.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Search Results
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {searchResults.map((result) => (
                        <div
                            key={result.content_id}
                            className="relative aspect-video cursor-pointer group"
                            onClick={() => {
                              onClose();
                              // Handle the clicked movie here
                            }}
                        >
                          <img
                              src={result.thumbnail_url}
                              alt={result.title}
                              className="w-full h-full object-cover rounded-md"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white text-center p-2">{result.title}</p>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default MovieInfoModal;
