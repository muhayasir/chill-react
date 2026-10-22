import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  console.warn('VITE_API_URL belum diisi. Periksa file .env kamu.');
}

const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Interceptor request: logging terpusat (hanya saat development)
client.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.params || '');
  }
  return config;
});

// Interceptor response: semua error diubah jadi pesan yang rapi di satu tempat
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    let message = `Request gagal (${status})`;

    if (!error.response) {
      message = 'Tidak dapat terhubung ke server API. Periksa koneksi internet kamu.';
    } else if (status === 404) {
      message = 'Data tidak ditemukan';
    }

    const friendly = new Error(message);
    friendly.status = status;
    return Promise.reject(friendly);
  }
);

export default client;