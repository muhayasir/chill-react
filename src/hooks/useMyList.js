import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext.jsx';
import { addToMyList, removeFromMyList } from '../store/redux/myListSlice.js';

/**
 * Membungkus Redux (useSelector dan dispatch) untuk Daftar Saya,
 * jadi komponen cukup memanggil addToMyList / removeFromMyList / toggleMyList.
 */
export default function useMyList() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const myList = useSelector((state) => state.myList.items);

  const isInMyList = (title) => myList.some((m) => m.title === title);

  const add = (movie) => dispatch(addToMyList({ userId: user.id, movie }));
  const remove = (title) => dispatch(removeFromMyList({ userId: user.id, title }));
  const toggleMyList = (movie) => (isInMyList(movie.title) ? remove(movie.title) : add(movie));

  return { myList, isInMyList, addToMyList: add, removeFromMyList: remove, toggleMyList };
}