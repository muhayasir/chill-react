import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../../services/api/movieService.js';

// GET: ambil semua film dari API lalu simpan ke state global
export const fetchMovies = createAsyncThunk(
  'movies/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getMovies();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    // cegah request ganda kalau sedang loading (mis. React StrictMode di development)
    condition: (_, { getState }) => getState().movies.status !== 'loading',
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  // Initial state: array kosong yang nantinya diisi data dari API
  initialState: { items: [], status: 'idle', error: '' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Gagal memuat data film';
      });
  },
});

export default moviesSlice.reducer;