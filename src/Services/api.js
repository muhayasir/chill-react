const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Modul ini membungkus semua request API untuk fitur Profil.
 * Memakai JSONPlaceholder (fake REST API) sebagai contoh karena project ini
 * belum punya backend sendiri. Kalau nanti sudah ada backend asli, cukup
 * ganti BASE_URL & endpoint di sini — kode di Profile.jsx tidak perlu berubah.
 */

// GET — ambil data profil user (READ)
export async function getProfile(userId = 1) {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) throw new Error('Gagal mengambil data profil');
  const data = await res.json();
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    password: '', // API publik tidak menyimpan/mengembalikan password asli
  };
}

// PUT — simpan perubahan profil (UPDATE)
export async function updateProfile(userId, profile) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error('Gagal menyimpan data profil');
  return res.json();
}

// DELETE — hapus akun (DELETE)
export async function deleteProfile(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Gagal menghapus akun');
  return true;
}