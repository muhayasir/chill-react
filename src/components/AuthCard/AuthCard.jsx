import './AuthCard.css';

/**
 * AuthCard reusable: dipakai untuk Login & Register, tinggal beda title/subtitle
 * dan children (isi form) yang di-passing.
 */
export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="login-container">
      <img src="/images/logo-chill.png" alt="Chill Logo" />
      <div className="header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
