import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar.jsx';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { fetchMovies } from '../../store/redux/moviesSlice.js';
import './Home.css';

// Satu baris di sini = satu carousel di halaman
const SECTIONS = [
  { key: 'continueWatching', title: 'Melanjutkan Tonton Film', columns: 4, variant: 'overlay' },
  { key: 'topRating', title: 'Top Rating Film dan Series Hari Ini', columns: 5, variant: 'plain' },
  { key: 'trending', title: 'Film Trending', columns: 5, variant: 'plain' },
  { key: 'newReleases', title: 'Rilis Baru', columns: 5, variant: 'plain' },
];

export default function Home() {
  const dispatch = useDispatch();
  // useSelector: ambil data film dari state Redux
  const { items, status, error } = useSelector((state) => state.movies);

  // GET data dari API saat halaman pertama kali dibuka
  useEffect(() => {
    if (status === 'idle') dispatch(fetchMovies());
  }, [status, dispatch]);

  // Kelompokkan film berdasarkan kategorinya
  const grouped = useMemo(() => {
    const result = {};
    SECTIONS.forEach(({ key }) => {
      result[key] = items.filter((movie) => movie.category === key);
    });
    return result;
  }, [items]);

  return (
    <>
      <Navbar />
      <main className="main-content">
        <HeroSection
          title="Duty After School"
          description="Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi penjuang garis depan dalam perang."
          ageRating="18+"
        />

        {status === 'loading' && <p className="home-message">Memuat film...</p>}

        {status === 'failed' && (
          <div className="home-message">
            <p>{error}</p>
            <button type="button" onClick={() => dispatch(fetchMovies())}>
              Coba lagi
            </button>
          </div>
        )}

        {status === 'succeeded' && items.length === 0 && (
          <p className="home-message">
            Belum ada data film di API. Jalankan "npm run seed" satu kali untuk mengisinya.
          </p>
        )}

        {SECTIONS.map(
          ({ key, title, columns, variant }) =>
            grouped[key].length > 0 && (
              <MovieCarousel
                key={key}
                title={title}
                movies={grouped[key]}
                columns={columns}
                variant={variant}
              />
            )
        )}
      </main>

      <Footer />
    </>
  );
}