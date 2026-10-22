import { useState, useEffect } from 'react';
import { getUserById, updateUser, deleteUser } from '../services/api/userService.js';

/**
 * Mengurus GET, UPDATE, dan DELETE profil milik user yang sedang login.
 * Komponen Profile cukup memakai hasilnya tanpa tahu detail API.
 */
export default function useProfile(userId) {
  const [profile, setProfile] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // GET: ambil profil saat userId tersedia
  useEffect(() => {
    if (!userId) return undefined;
    let ignore = false;
    setLoading(true);

    getUserById(userId)
      .then((data) => {
        if (!ignore) {
          setProfile({ username: data.username, email: data.email, password: data.password });
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [userId]);

  const setField = (field, value) => setProfile((prev) => ({ ...prev, [field]: value }));

  // UPDATE: kembalikan true kalau berhasil
  const save = async () => {
    if (!profile.username.trim() || !profile.email.trim() || !profile.password) {
      setError('Nama pengguna, email, dan kata sandi tidak boleh kosong');
      return false;
    }
    try {
      setSaving(true);
      setError('');
      await updateUser(userId, profile);
      setSuccessMessage('Profil berhasil disimpan');
      setTimeout(() => setSuccessMessage(''), 2500);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // DELETE: kembalikan true kalau berhasil
  const remove = async () => {
    try {
      await deleteUser(userId);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { profile, setField, loading, saving, error, setError, successMessage, save, remove };
}