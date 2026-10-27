import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice.js';
import myListReducer from './myListSlice.js';

// Semua reducer didaftarkan di sini
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    myList: myListReducer,
  },
});