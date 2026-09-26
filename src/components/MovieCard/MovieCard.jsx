import { IoPlay, IoCheckmarkOutline, IoChevronDownOutline } from 'react-icons/io5';
import './MovieCard.css';

/**
 * MovieCard reusable.
 * variant "overlay" -> background-image + judul & rating (dipakai di "Melanjutkan Tonton Film")
 * variant "plain"   -> hanya poster (dipakai di carousel lainnya)
 *
 * Kirim subtitle/duration/ageRating/genres untuk memunculkan panel preview saat di-hover,
 * kalau tidak dikirim, card berperilaku seperti biasa (tanpa hover preview).
 */
export default function MovieCard({
  image,
  title,
  rating,
  variant = 'plain',
  subtitle,
  duration,
  ageRating,
  genres = [],
}) {
  const hasPreview = Boolean(duration || ageRating || genres.length > 0);

  return (
    <div className="movie-card-wrapper">
      <div className="movie-card-inner">
        <div
          className={`movie-card ${variant === 'overlay' ? 'width-ratio' : ''}`}
          style={variant === 'overlay' ? { backgroundImage: `url(${image})` } : undefined}
        >
          {variant === 'plain' && <img src={image} alt={title} />}

          {variant === 'overlay' && (
            <div className="overlay-text">
              <span>{title}</span>
              <span>{rating}</span>
            </div>
          )}
        </div>

        {hasPreview && (
          <div className="movie-card-preview">
            <div className="preview-actions">
              <button className="preview-btn preview-btn-play" aria-label="Putar">
                <IoPlay />
              </button>
              <button className="preview-btn" aria-label="Tambah ke Daftar Saya">
                <IoCheckmarkOutline />
              </button>
              <button className="preview-btn preview-btn-more" aria-label="Info selengkapnya">
                <IoChevronDownOutline />
              </button>
            </div>

            <div className="preview-info">
              <p className="preview-title">{title}</p>
              {subtitle && <p className="preview-subtitle">{subtitle}</p>}
              <div className="preview-meta">
                {ageRating && <span className="preview-age">{ageRating}</span>}
                {duration && <span>{duration}</span>}
              </div>
              {genres.length > 0 && <p className="preview-genres">{genres.join(' • ')}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}