import Navbar from '../../components/Navbar/Navbar.jsx';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { continueWatching, topRating, trending, newReleases } from '../../data/movies.js';
import './Home.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <HeroSection
          title="Duty After School"
          description="Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi penjuang garis depan dalam perang."
          ageRating="18+"
        />

        <MovieCarousel
          title="Melanjutkan Tonton Film"
          movies={continueWatching}
          columns={4}
          variant="overlay"
        />

        <MovieCarousel title="Top Rating Film dan Series Hari Ini" movies={topRating} columns={5} />

        <MovieCarousel title="Film Trending" movies={trending} columns={5} />

        <MovieCarousel title="Rilis Baru" movies={newReleases} columns={5} />
      </main>

      <Footer />
    </>
  );
}
