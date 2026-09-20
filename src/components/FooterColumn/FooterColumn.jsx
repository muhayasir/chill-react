import './FooterColumn.css';

/**
 * FooterColumn reusable.
 * - Kirim prop `links` (array string) untuk kolom satu-list biasa (mis. Bantuan).
 * - Kirim prop `columns` (array of array string) untuk kolom multi-group (mis. Genre).
 */
export default function FooterColumn({ title, links, columns, className = '' }) {
  return (
    <details className={`link-column ${className}`} open>
      <summary>
        <h4>{title}</h4>
      </summary>
      {columns ? (
        <div className="genre-lists">
          {columns.map((group, index) => (
            <ul key={index}>
              {group.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      ) : (
        <ul>
          {links.map((item) => (
            <li key={item}>
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}
