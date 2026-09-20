import { useState } from 'react';
import { IoVolumeMuteOutline, IoVolumeHighOutline } from 'react-icons/io5';
import './HeroSection.css';

/**
 * HeroSection reusable: judul, deskripsi, dan rating umur di-passing via props,
 * jadi komponen ini bisa dipakai ulang untuk film apa pun.
 */
export default function HeroSection({
  title,
  description,
  ageRating = '18+',
  backgroundImage = '/images/hero-section.png',
}) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div>
      <div className="hero-info">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-desc">{description}</p>
      </div>
      <div className="hero-controls">
        <div className="control-left">
          <button className="btn-play">Mulai</button>
          <button className="btn-more">ⓘ Selengkapnya</button>
          <div className="age-rating">
            <span>{ageRating}</span>
          </div>
        </div>
        <div className="control-right">
          <button className="volume-control" onClick={() => setIsMuted((m) => !m)}>
            {isMuted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
          </button>
        </div>
      </div>
    </section>
  );
}
