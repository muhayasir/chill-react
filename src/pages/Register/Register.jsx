import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { addUser } from '../../services/api/userService.js';
import useRequest from '../../hooks/useRequest.js';
import AuthCard from '../../components/AuthCard/AuthCard.jsx';
import InputField from '../../components/InputField/InputField.jsx';
import Button from '../../components/Button/Button.jsx';
import './Register.css';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const { run: submitRegister, loading, error, setError } = useRequest(addUser);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (form.password !== form.confirmPassword) {
      setError('Konfirmasi kata sandi tidak sama');
      return;
    }

    try {
      const newUser = await submitRegister({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      login(newUser);
      navigate('/', { replace: true });
    } catch {
      // pesan error sudah disimpan oleh useRequest
    }
  };

  return (
    <div className="register-page">
      <AuthCard title="Daftar" subtitle="Selamat datang!">
        <form onSubmit={handleSubmit}>
          <InputField id="username" label="Username" placeholder="Masukkan username"
            value={form.username} onChange={handleChange} />
          <InputField id="email" type="email" label="Email" placeholder="Masukkan email"
            value={form.email} onChange={handleChange} />
          <InputField id="password" label="Kata Sandi" placeholder="Masukkan kata sandi" showToggle
            value={form.password} onChange={handleChange} />
          <InputField id="confirm-password" name="confirmPassword" label="Konfirmasi Kata Sandi"
            placeholder="Masukkan kembali kata sandi" showToggle
            value={form.confirmPassword} onChange={handleChange} />

          {error && <p className="auth-error">{error}</p>}

          <div className="form-links">
            <p className="register-link">
              Sudah punya akun? <Link to="/login">Masuk</Link>
            </p>
          </div>

          <Button type="submit">{loading ? 'Memproses...' : 'Daftar'}</Button>

          <div className="divider">Atau</div>

          <Button variant="google" icon="/images/logo-google.png">
            Daftar dengan Google
          </Button>
        </form>
      </AuthCard>
    </div>
  );
}