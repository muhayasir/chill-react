import { useState, useEffect, useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';
import './MovieCarousel.css';

// Harus sinkron dengan .five-column > li di MovieCarousel.css (width + gap)
const CARD_WIDTH = 200;
const CARD_GAP = 28;

export default function MovieCarousel({ title, movies, columns = 5, variant = 'plain' }) {
  const columnClass = columns === 4 ? 'four-column' : 'five-column';
  const [isHovering, setIsHovering] = useState(false);
  const [displayMovies, setDisplayMovies] = useState(movies);
  const containerRef = useRef(null);

  useEffect(() => {
    // Fitur "isi layar penuh" hanya untuk five-column
    if (columns !== 5 || movies.length === 0) {
      setDisplayMovies(movies);
      return undefined;
    }

    const fillScreen = () => {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      const itemWidth = CARD_WIDTH + CARD_GAP;
      // +1 supaya ada sedikit "kelebihan" agar tetap terasa bisa di-scroll
      const minCount = Math.ceil(containerWidth / itemWidth) + 1;

      if (movies.length >= minCount) {
        setDisplayMovies(movies);
        return;
      }

      const lastMovie = movies[movies.length - 1];
      const padded = [...movies];
      let i = 0;
      while (padded.length < minCount) {
        // id dibuat unik supaya tidak bentrok, tapi seluruh datanya (poster, judul, dst) sama persis
        padded.push({ ...lastMovie, id: `${lastMovie.id}-pad-${i}` });
        i += 1;
      }
      setDisplayMovies(padded);
    };

    fillScreen();
    window.addEventListener('resize', fillScreen);
    return () => window.removeEventListener('resize', fillScreen);
  }, [movies, columns]);

  return (
    <section className="movie-carousel">
      <h2 className="section-title">{title}</h2>
      <div className="card-container" ref={containerRef}>
        <ul className={`movie-list ${columnClass} ${isHovering ? 'is-hovering' : ''}`}>
          {displayMovies.map((movie) => (
            <li
              key={movie.id}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <MovieCard {...movie} variant={variant} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}