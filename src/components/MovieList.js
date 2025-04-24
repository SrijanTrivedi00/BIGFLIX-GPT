import { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, fetchMoreMovies }) => {
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const scrollInterval = useRef(null);
  const animationFrame = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (!containerRef.current || isPaused) return;

    const container = containerRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 1; // Adjust speed (pixels per frame)

    const animateScroll = () => {
      scrollPosition += scrollSpeed;
      
      // Check if we need to load more movies
      if (scrollPosition >= container.scrollWidth - container.clientWidth * 1.5) {
        if (!loading && fetchMoreMovies) {
          setLoading(true);
          fetchMoreMovies().finally(() => {
            setLoading(false);
            // Reset scroll position to create infinite loop
            scrollPosition = 0;
            container.scrollLeft = 0;
          });
        }
      }
      
      container.scrollLeft = scrollPosition;
      animationFrame.current = requestAnimationFrame(animateScroll);
    };

    animationFrame.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [movies, loading, fetchMoreMovies, isPaused]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="px-6 relative group">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div 
        className="flex overflow-x-hidden no-scrollbar relative"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
          {loading && (
            <div className="flex items-center justify-center min-w-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        
        {/* Clone the movies for seamless infinite effect */}
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={`clone-${movie.id}`} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
      
      {/* Gradient fade at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MovieList;