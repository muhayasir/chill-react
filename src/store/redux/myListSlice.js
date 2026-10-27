import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { getUserById, saveMyList } from '../../services/api/userService.js';

// GET: ambil Daftar Saya milik user dari API
export const fetchMyList = createAsyncThunk('myList/fetch', async (userId, { rejectWithValue }) => {
  try {
    const user = await getUserById(userId);
    return user.myList;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Kirim isi state saat ini ke API (state sudah diubah lebih dulu di reducer "pending")
const syncMyList = async ({ userId }, { getState, rejectWithValue }) => {
  try {
    await saveMyList(userId, getState().myList.items);
  } catch (err) {
    return rejectWithValue(err.message);
  }
};

// ADD dan DELETE: tampilan diperbarui dulu, lalu disimpan ke API
export const addToMyList = createAsyncThunk('myList/add', syncMyList);
export const removeFromMyList = createAsyncThunk('myList/remove', syncMyList);

// Kalau API gagal, kembalikan state ke kondisi sebelum diubah
function rollback(state, action) {
  state.items = state.backup;
  state.error = action.payload || 'Gagal menyimpan Daftar Saya';
}

const myListSlice = createSlice({
  name: 'myList',
  // Initial state: array kosong yang nantinya diisi data dari API
  initialState: { items: [], backup: [], status: 'idle', error: '' },
  reducers: {
    clearMyList: (state) => {
      state.items = [];
      state.backup = [];
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMyList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Gagal memuat Daftar Saya';
      })
      .addCase(addToMyList.pending, (state, action) => {
        const { movie } = action.meta.arg;
        if (state.items.some((m) => m.title === movie.title)) return;
        state.backup = current(state.items);
        state.items.push({ title: movie.title, image: movie.image });
      })
      .addCase(addToMyList.rejected, rollback)
      .addCase(removeFromMyList.pending, (state, action) => {
        state.backup = current(state.items);
        state.items = state.items.filter((m) => m.title !== action.meta.arg.title);
      })
      .addCase(removeFromMyList.rejected, rollback);
  },
});

export const { clearMyList } = myListSlice.actions;
export default myListSlice.reducer;