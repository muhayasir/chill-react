const BASE_URL = 'http://localhost:3001';

async function request(path, options) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, options);
  } catch {
    throw new Error('Tidak dapat terhubung ke server API. Pastikan "npm run api" sudah dijalankan.');
  }
  if (!res.ok) throw new Error(`Request gagal (${res.status})`);
  return res.json();
}

const withBody = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

// CREATE: daftar akun baru
export async function registerUser({ username, email, password }) {
  const sameUsername = await request(`/users?username=${encodeURIComponent(username)}`);
  if (sameUsername.length > 0) throw new Error('Username sudah digunakan');

  const sameEmail = await request(`/users?email=${encodeURIComponent(email)}`);
  if (sameEmail.length > 0) throw new Error('Email sudah terdaftar');

  return request('/users', withBody('POST', { username, email, password, myList: [] }));
}

// READ: login = cari user yang cocok di database
export async function loginUser({ username, password }) {
  const users = await request(
    `/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  );
  if (users.length === 0) {
    throw new Error('Username atau kata sandi salah, atau akun belum terdaftar');
  }
  return users[0];
}

// READ: ambil data satu user
export const getUser = (id) => request(`/users/${id}`);

// UPDATE: ubah data profil
export const updateUser = (id, data) => request(`/users/${id}`, withBody('PATCH', data));

// DELETE: hapus akun
export const deleteUser = (id) => request(`/users/${id}`, { method: 'DELETE' });

// UPDATE: simpan Daftar Saya milik user
export const saveMyList = (id, myList) => request(`/users/${id}`, withBody('PATCH', { myList }));