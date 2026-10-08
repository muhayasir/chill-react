import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { loginUser } from '../../services/api.js';
import AuthCard from '../../components/AuthCard/AuthCard.jsx';
import InputField from '../../components/InputField/InputField.jsx';
import Button from '../../components/Button/Button.jsx';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');

    try {
      setLoading(true);
      const user = await loginUser(form);
      login(user);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <AuthCard title="Masuk" subtitle="Selamat datang kembali!">
        <form onSubmit={handleSubmit}>
          <InputField id="username" label="Username" placeholder="Masukkan username"
            value={form.username} onChange={handleChange} />
          <InputField id="password" label="Kata Sandi" placeholder="Masukkan kata sandi" showToggle
            value={form.password} onChange={handleChange} />

          {error && <p className="auth-error">{error}</p>}

          <div className="form-links">
            <p className="register-link">
              Belum punya akun? <Link to="/register">Daftar</Link>
            </p>
            <p>
              <a href="#" className="forgot-password">Lupa kata sandi?</a>
            </p>
          </div>

          <Button type="submit">{loading ? 'Memproses...' : 'Masuk'}</Button>

          <div className="divider">Atau</div>

          <Button variant="google" icon="/images/logo-google.png">
            Masuk dengan Google
          </Button>
        </form>
      </AuthCard>
    </div>
  );
}