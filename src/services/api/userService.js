import client from './client.js';

const sameText = (a, b) => String(a).toLowerCase() === String(b).toLowerCase();

// Terima myList berupa array maupun teks JSON, selalu kembalikan array
const toList = (value) => {
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value) || [];
  } catch {
    return [];
  }
};
const normalize = (user) => ({ ...user, myList: toList(user.myList) });

// Pencarian tanpa hasil di MockAPI bisa membalas 404, anggap saja daftar kosong
async function searchUsers(params) {
  try {
    const { data } = await client.get('/users', { params });
    return data;
  } catch (err) {
    if (err.status === 404) return [];
    throw err;
  }
}

// ADD: daftar akun baru
export async function addUser({ username, email, password }) {
  const sameName = await searchUsers({ username });
  if (sameName.some((u) => sameText(u.username, username))) {
    throw new Error('Username sudah digunakan');
  }

  const sameMail = await searchUsers({ email });
  if (sameMail.some((u) => sameText(u.email, email))) {
    throw new Error('Email sudah terdaftar');
  }

  const { data } = await client.post('/users', { username, email, password, myList: [] });
  return normalize(data);
}

// GET: login = cari user dengan username dan password yang cocok
export async function loginUser({ username, password }) {
  const users = await searchUsers({ username });
  const user = users.find((u) => sameText(u.username, username) && u.password === password);
  if (!user) {
    throw new Error('Username atau kata sandi salah, atau akun belum terdaftar');
  }
  return normalize(user);
}

// GET: ambil satu user
export async function getUserById(id) {
  const { data } = await client.get(`/users/${id}`);
  return normalize(data);
}

// UPDATE: ambil data lama, gabungkan, lalu kirim lengkap lewat PUT
export async function updateUser(id, changes) {
  const { data: current } = await client.get(`/users/${id}`);
  const { data } = await client.put(`/users/${id}`, { ...current, ...changes });
  return normalize(data);
}

// UPDATE: simpan Daftar Saya milik user
export const saveMyList = (id, myList) => updateUser(id, { myList });

// DELETE: hapus akun
export async function deleteUser(id) {
  await client.delete(`/users/${id}`);
  return true;
}