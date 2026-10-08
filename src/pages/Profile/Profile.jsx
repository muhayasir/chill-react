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
import { getUser, updateUser, deleteUser } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useMyList } from '../../context/MyListContext.jsx';
import './Profile.css';

export default function Profile() {
  const { user, logout, updateSessionUser } = useAuth();
  const { myList, removeFromMyList } = useMyList();
  const navigate = useNavigate();
  const userId = user?.id;

  const [profile, setProfile] = useState({ username: '', email: '', password: '' });
  const [editing, setEditing] = useState({ username: false, email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // READ: ambil data profil milik akun yang sedang login
  useEffect(() => {
    if (!userId) return undefined;
    let ignore = false;

    async function loadProfile() {
      try {
        setLoading(true);
        const data = await getUser(userId);
        if (!ignore) {
          setProfile({ username: data.username, email: data.email, password: data.password });
        }
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
  }, [userId]);

  const toggleEdit = (field) => setEditing((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleFieldChange = (field, value) => setProfile((prev) => ({ ...prev, [field]: value }));

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

  // UPDATE: simpan perubahan profil
  const handleSave = async (e) => {
    e.preventDefault();
    if (!profile.username.trim() || !profile.email.trim() || !profile.password) {
      setError('Nama pengguna, email, dan kata sandi tidak boleh kosong');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await updateUser(userId, profile);
      updateSessionUser({ username: profile.username, email: profile.email });
      setSuccessMessage('Profil berhasil disimpan');
      setEditing({ username: false, email: false, password: false });
      setTimeout(() => setSuccessMessage(''), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // DELETE: hapus akun
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Yakin ingin menghapus akun ini? Tindakan ini tidak bisa dibatalkan.'
    );
    if (!confirmed) return;

    try {
      await deleteUser(userId);
      logout();
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.message);
    }
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
                <label className="btn-upload-avatar" htmlFor="avatar-input">Ubah Foto</label>
                <input id="avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                <p className="avatar-hint">Maksimal 2MB</p>
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="username">Nama Pengguna</label>
              <div className="field-input-wrapper">
                <input id="username" type="text" value={profile.username} disabled={!editing.username}
                  onChange={(e) => handleFieldChange('username', e.target.value)} />
                <button type="button" className="field-icon-btn" onClick={() => toggleEdit('username')}>
                  <IoPencilOutline />
                </button>
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="email">Email</label>
              <div className="field-input-wrapper">
                <input id="email" type="email" value={profile.email} disabled={!editing.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)} />
                <button type="button" className="field-icon-btn" onClick={() => toggleEdit('email')}>
                  <IoPencilOutline />
                </button>
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="password">Kata Sandi</label>
              <div className="field-input-wrapper">
                <input id="password" type={showPassword ? 'text' : 'password'} value={profile.password}
                  disabled={!editing.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)} />
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
            <button type="button" className="btn-subscribe">Mulai Berlangganan</button>
          </aside>
        </div>

        <section className="my-list-section">
          <div className="my-list-header">
            <h2>Daftar Saya</h2>
            <a href="#">Lihat Semua</a>
          </div>
          <div className="my-list-grid">
            {myList.map((item) => (
              <div className="my-list-item" key={item.title}>
                <img src={item.image} alt={item.title} />
                <button
                  type="button"
                  className="my-list-remove"
                  onClick={() => removeFromMyList(item.title)}
                  aria-label={`Hapus ${item.title} dari Daftar Saya`}
                >
                  <IoCloseOutline />
                </button>
              </div>
            ))}
            {myList.length === 0 && (
              <p>Belum ada film di Daftar Saya. Arahkan kursor ke poster di beranda lalu klik tombol +.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}