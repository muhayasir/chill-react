import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchMyList, clearMyList } from '../../store/redux/myListSlice.js';

/**
 * Tidak menampilkan apa pun. Tugasnya: setiap kali user login, ambil Daftar Saya
 * miliknya dari API ke Redux. Saat logout, kosongkan lagi.
 */
export default function DataLoader() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userId = user?.id;

  useEffect(() => {
    if (userId) dispatch(fetchMyList(userId));
    else dispatch(clearMyList());
  }, [userId, dispatch]);

  return null;
}