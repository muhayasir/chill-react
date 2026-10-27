// Mengisi resource "movies" di MockAPI dengan data film awal (cukup dijalankan sekali).
//   npm run seed
//   atau: node scripts/seedMovies.js https://KODE.mockapi.io/api/v1
import axios from 'axios';
import { continueWatching, topRating, trending, newReleases } from '../src/data/movies.js';

const baseURL = process.argv[2] || process.env.VITE_API_URL;
if (!baseURL) {
  console.error('Alamat API belum diisi. Isi VITE_API_URL di .env atau tulis alamatnya sebagai argumen.');
  process.exit(1);
}

const client = axios.create({ baseURL });
const groups = { continueWatching, topRating, trending, newReleases };

const existing = await client.get('/movies').then((r) => r.data).catch(() => []);
if (existing.length > 0) {
  console.log(`Resource movies sudah berisi ${existing.length} film. Seed dibatalkan.`);
  process.exit(0);
}

for (const [category, list] of Object.entries(groups)) {
  for (const movie of list) {
    const { id, genres, ...rest } = movie; // id lokal dibuang, MockAPI membuat id sendiri
    await client.post('/movies', { ...rest, category, genres: (genres || []).join(', ') });
    console.log(`+ [${category}] ${movie.title}`);
  }
}
console.log('Selesai.');