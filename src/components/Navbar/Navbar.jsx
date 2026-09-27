import { useNavigate } from 'react-router-dom';
import {
  IoChevronDownOutline,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoStarOutline,
  IoLogOutOutline,
} from 'react-icons/io5';
import { navLinks, dropdownMenu } from '../../data/navData.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './Navbar.css';

// Pemetaan label menu -> komponen Ionicon
const menuIcons = {
  'Profil Saya': IoPersonOutline,
  'Ubah Premium': IoStarOutline,
  Keluar: IoLogOutOutline,
};

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();


  const handleMenuClick = (label) => (e) => {
  e.preventDefault();
  if (label === 'Keluar') {
    logout();
    navigate('/login', { replace: true });
  } else if (label === 'Profil Saya') {
    navigate('/profile');
  }
};

  return (
    <header className="navbar">
      <div className="nav-left">
        <div>
          <img src="/images/logo-chill.png" alt="Chill Logo" />
        </div>
        <nav className="navigation">
          <ul>
            {navLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="nav-right">
        <div className="avatar-profil">
          <IoPersonCircleOutline />
        </div>
        <div className="dropdown">
          <button className="dropdown-toggle">
            <IoChevronDownOutline />
          </button>
          <div className="dropdown-menu">
            {dropdownMenu.map((label) => {
              const Icon = menuIcons[label];
              return (
                <a href="#" key={label} onClick={handleMenuClick(label)}>
                  <Icon /> {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
