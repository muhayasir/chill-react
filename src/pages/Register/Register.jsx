import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthCard from '../../components/AuthCard/AuthCard.jsx';
import InputField from '../../components/InputField/InputField.jsx';
import Button from '../../components/Button/Button.jsx';
import './Register.css';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: ganti dengan pemanggilan API registrasi yang sesungguhnya
    login();
    navigate('/', { replace: true });
  };

  return (
    <div className="register-page">
      <AuthCard title="Daftar" subtitle="Selamat datang!">
        <form onSubmit={handleSubmit}>
          <InputField id="username" label="Username" placeholder="Masukkan username" />
          <InputField
            id="password"
            label="Kata Sandi"
            placeholder="Masukkan kata sandi"
            showToggle
          />
          <InputField
            id="confirm-password"
            label="Konfirmasi Kata Sandi"
            placeholder="Masukkan kembali kata sandi"
            showToggle
          />

          <div className="form-links">
            <p className="register-link">
              Sudah punya akun? <Link to="/login">Masuk</Link>
            </p>
          </div>

          <Button type="submit">Daftar</Button>

          <div className="divider">Atau</div>

          <Button variant="google" icon="/images/logo-google.png">
            Daftar dengan Google
          </Button>
        </form>
      </AuthCard>
    </div>
  );
}
