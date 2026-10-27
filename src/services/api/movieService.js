import client from './client.js';

// genres di MockAPI disimpan sebagai teks "Drama, Komedi", diubah jadi array di sini
const toGenres = (value) =>
  Array.isArray(value)
    ? value
    : String(value || '')
        .split(',')
        .map((g) => g.trim())
        .filter(Boolean);

const normalize = (movie) => ({ ...movie, genres: toGenres(movie.genres) });

// GET: ambil semua film
export async function getMovies() {
  try {
    const { data } = await client.get('/movies');
    return data.map(normalize).sort((a, b) => Number(a.id) - Number(b.id));
  } catch (err) {
    if (err.status === 404) return []; // resource masih kosong
    throw err;
  }
}