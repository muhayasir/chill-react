import {
  IoPlay,
  IoCheckmarkOutline,
  IoAddOutline,
  IoChevronDownOutline,
} from 'react-icons/io5';
import { useMyList } from '../../context/MyListContext.jsx';
import './MovieCard.css';

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
  const { isInMyList, toggleMyList } = useMyList();
  const inList = isInMyList(title);

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

        {/* Panel hover selalu dirender, tanpa pengecekan hasPreview */}
        <div className="movie-card-preview">
          <div className="preview-actions">
            <button className="preview-btn preview-btn-play" aria-label="Putar">
              <IoPlay />
            </button>
            <button
              className="preview-btn"
              aria-label={inList ? 'Hapus dari Daftar Saya' : 'Tambah ke Daftar Saya'}
              onClick={() => toggleMyList({ title, image })}
            >
              {inList ? <IoCheckmarkOutline /> : <IoAddOutline />}
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
      </div>
    </div>
  );
}