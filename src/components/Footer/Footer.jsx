import FooterColumn from '../FooterColumn/FooterColumn.jsx';
import { genreColumns, helpLinks } from '../../data/footerData.js';
import './Footer.css';

export default function Footer() {
  return (
    <>
      <hr className="footer-divider" />
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-info">
            <img src="/images/logo-chill.png" alt="Chill Logo" />
            <p>&copy; 2023 Chill. All Rights Reserved.</p>
          </div>
          <div className="footer-links">
            <FooterColumn title="Genre" columns={genreColumns} className="genre-column" />
            <FooterColumn title="Bantuan" links={helpLinks} />
          </div>
        </div>
      </footer>
    </>
  );
}
