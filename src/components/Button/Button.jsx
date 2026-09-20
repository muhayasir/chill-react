import './Button.css';

/**
 * Button reusable.
 * variant: "primary" (btn-main) | "google" (btn-google)
 */
export default function Button({ children, variant = 'primary', type = 'button', onClick, icon }) {
  const className = variant === 'google' ? 'btn-google' : 'btn-main';

  return (
    <button type={type} className={className} onClick={onClick}>
      {icon && <img src={icon} alt="" />}
      {children}
    </button>
  );
}
