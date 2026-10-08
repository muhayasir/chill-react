import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { getUser, saveMyList } from '../services/api.js';

const MyListContext = createContext(null);

// Film dianggap sama kalau judulnya sama (poster yang sama muncul di beberapa carousel)
export function MyListProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id;
  const [myList, setMyList] = useState([]);

  // Ambil Daftar Saya milik user yang sedang login
  useEffect(() => {
    if (!userId) {
      setMyList([]);
      return undefined;
    }
    let ignore = false;
    getUser(userId)
      .then((data) => {
        if (!ignore) setMyList(data.myList || []);
      })
      .catch((err) => console.error(err));
    return () => {
      ignore = true;
    };
  }, [userId]);

  const persist = async (next) => {
    setMyList(next); // update UI dulu supaya terasa instan
    try {
      await saveMyList(userId, next);
    } catch (err) {
      console.error(err);
    }
  };

  const isInMyList = (title) => myList.some((m) => m.title === title);

  const addToMyList = (movie) => {
    if (isInMyList(movie.title)) return;
    persist([...myList, { title: movie.title, image: movie.image }]);
  };

  const removeFromMyList = (title) => persist(myList.filter((m) => m.title !== title));

  const toggleMyList = (movie) =>
    isInMyList(movie.title) ? removeFromMyList(movie.title) : addToMyList(movie);

  return (
    <MyListContext.Provider
      value={{ myList, isInMyList, addToMyList, removeFromMyList, toggleMyList }}
    >
      {children}
    </MyListContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMyList() {
  const ctx = useContext(MyListContext);
  if (!ctx) throw new Error('useMyList harus dipakai di dalam <MyListProvider>');
  return ctx;
}