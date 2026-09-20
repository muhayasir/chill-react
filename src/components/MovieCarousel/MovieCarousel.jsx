import MovieCard from '../MovieCard/MovieCard.jsx';
import './MovieCarousel.css';

/**
 * MovieCarousel reusable, dipakai untuk semua section film di homepage.
 * Data (title, movies, columns, variant) di-passing lewat props.
 */
export default function MovieCarousel({ title, movies, columns = 5, variant = 'plain' }) {
  const columnClass = columns === 4 ? 'four-column' : 'five-column';

  return (
    <section className="movie-carousel">
      <h2 className="section-title">{title}</h2>
      <div className="card-container">
        <ul className={`movie-list ${columnClass}`}>
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard {...movie} variant={variant} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
