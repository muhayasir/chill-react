import './MovieCard.css';

/**
 * MovieCard reusable.
 * variant "overlay" -> background-image + judul & rating di atasnya (dipakai di "Melanjutkan Tonton Film")
 * variant "plain"   -> hanya poster (dipakai di carousel lainnya)
 */
export default function MovieCard({ image, title, rating, variant = 'plain' }) {
  if (variant === 'overlay') {
    return (
      <div className="movie-card width-ratio" style={{ backgroundImage: `url(${image})` }}>
        <div className="overlay-text">
          <span>{title}</span>
          <span>{rating}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-card">
      <img src={image} alt={title} />
    </div>
  );
}
