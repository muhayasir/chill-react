const BASE_URL = 'https://abc123.mockapi.io/api/v1';

async function request(path, options) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, options);
  } catch {
    throw new Error('Tidak dapat terhubung ke server API.');
  }
  // Pencarian (?filter) tanpa hasil dianggap daftar kosong, bukan error
  const isSearch = path.includes('?') && (!options || !options.method);
  if (res.status === 404 && isSearch) return [];
  if (!res.ok) throw new Error(`Request gagal (${res.status})`);
  return res.json();
}

const withBody = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

// Filter MockAPI bisa mencocokkan sebagian teks, jadi dicek ulang agar persis sama
const sameText = (a, b) => String(a).toLowerCase() === String(b).toLowerCase();

// CREATE: daftar akun baru
export async function registerUser({ username, email, password }) {
  const byName = await request(`/users?username=${encodeURIComponent(username)}`);
  if (byName.some((u) => sameText(u.username, username))) {
    throw new Error('Username sudah digunakan');
  }

  const byEmail = await request(`/users?email=${encodeURIComponent(email)}`);
  if (byEmail.some((u) => sameText(u.email, email))) {
    throw new Error('Email sudah terdaftar');
  }

  return request('/users', withBody('POST', { username, email, password, myList: [] }));
}

// READ: login = cari user yang username dan password-nya cocok
export async function loginUser({ username, password }) {
  const users = await request(`/users?username=${encodeURIComponent(username)}`);
  const user = users.find((u) => sameText(u.username, username) && u.password === password);
  if (!user) {
    throw new Error('Username atau kata sandi salah, atau akun belum terdaftar');
  }
  return user;
}

// READ: ambil data satu user
export const getUser = (id) => request(`/users/${id}`);

// UPDATE: ambil data lama, gabungkan, lalu kirim lengkap lewat PUT
export async function updateUser(id, data) {
  const current = await request(`/users/${id}`);
  return request(`/users/${id}`, withBody('PUT', { ...current, ...data }));
}

// UPDATE: simpan Daftar Saya milik user
export const saveMyList = (id, myList) => updateUser(id, { myList });

// DELETE: hapus akun
export const deleteUser = (id) => request(`/users/${id}`, { method: 'DELETE' });