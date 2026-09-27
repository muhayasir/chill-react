import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoPencilOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCloseOutline,
  IoSparklesOutline,
} from 'react-icons/io5';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { getProfile, updateProfile, deleteProfile } from '../../Services/api.js';
import { initialMyList } from '../../data/myList.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './Profile.css';

const DEMO_USER_ID = 1; // JSONPlaceholder hanya punya user id 1-10

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ username: '', email: '', password: '' });
  const [editing, setEditing] = useState({ username: false, email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [myList, setMyList] = useState(initialMyList);

  // GET — ambil data profil saat halaman dibuka
  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      try {
        setLoading(true);
        const data = await getProfile(DEMO_USER_ID);
        if (!ignore) setProfile(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      ignore = true;
    };
  }, []);

  const toggleEdit = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleFieldChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Ukuran foto maksimal 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // UPDATE — simpan perubahan profil
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      await updateProfile(DEMO_USER_ID, profile);
      setSuccessMessage('Profil berhasil disimpan');
      setEditing({ username: false, email: false, password: false });
      setTimeout(() => setSuccessMessage(''), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // DELETE — hapus akun
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Yakin ingin menghapus akun ini? Tindakan ini tidak bisa dibatalkan.');
    if (!confirmed) return;

    try {
      await deleteProfile(DEMO_USER_ID);
      logout();
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE (array object) — hapus item dari Daftar Saya
  const handleRemoveFromList = (id) => {
    setMyList((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="profile-page">
          <p className="profile-loading">Memuat data profil...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="profile-page">
        <h1 className="profile-title">Profil Saya</h1>

        {error && <p className="profile-alert profile-alert-error">{error}</p>}
        {successMessage && <p className="profile-alert profile-alert-success">{successMessage}</p>}

        <div className="profile-grid">
          <form className="profile-form" onSubmit={handleSave}>
            <div className="avatar-section">
              <div className="avatar-preview">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" />
                ) : (
                  <div className="avatar-placeholder" />
                )}
              </div>
              <div>
                <label className="btn-upload-avatar" htmlFor="avatar-input">
                  Ubah Foto
                </label>
                <input
                  id="avatar-input"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  hidden
                />
                <p className="avatar-hint">Maksimal 2MB</p>
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="username">Nama Pengguna</label>
              <div className="field-input-wrapper">
                <input
                  id="username"
                  type="text"
                  value={profile.username}
                  disabled={!editing.username}
                  onChange={(e) => handleFieldChange('username', e.target.value)}
                />
                <button type="button" className="field-icon-btn" onClick={() => toggleEdit('username')}>
                  <IoPencilOutline />
                </button>
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="email">Email</label>
              <div className="field-input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled={!editing.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                />
                <button type="button" className="field-icon-btn" onClick={() => toggleEdit('email')}>
                  <IoPencilOutline />
                </button>
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="password">Kata Sandi</label>
              <div className="field-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={profile.password}
                  disabled={!editing.password}
                  placeholder="Masukkan kata sandi baru"
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                />
                <button type="button" className="field-icon-btn" onClick={() => setShowPassword((v) => !v)}>
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
                <button type="button" className="field-icon-btn" onClick={() => toggleEdit('password')}>
                  <IoPencilOutline />
                </button>
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn-save" disabled={saving}>
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button type="button" className="btn-delete" onClick={handleDeleteAccount}>
                Hapus Akun
              </button>
            </div>
          </form>

          <aside className="subscription-card">
            <IoSparklesOutline className="subscription-icon" />
            <h3>Saat ini anda belum berlangganan</h3>
            <p>Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!</p>
            <button type="button" className="btn-subscribe">
              Mulai Berlangganan
            </button>
          </aside>
        </div>

        <section className="my-list-section">
          <div className="my-list-header">
            <h2>Daftar Saya</h2>
            <a href="#">Lihat Semua</a>
          </div>
          <div className="my-list-grid">
            {myList.map((item) => (
              <div className="my-list-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <button
                  type="button"
                  className="my-list-remove"
                  onClick={() => handleRemoveFromList(item.id)}
                  aria-label={`Hapus ${item.title} dari Daftar Saya`}
                >
                  <IoCloseOutline />
                </button>
              </div>
            ))}
            {myList.length === 0 && <p>Belum ada film/series di daftar kamu.</p>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}