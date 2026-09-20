import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import './InputField.css';

/**
 * InputField reusable, dipakai di Login & Register.
 * Set showToggle = true untuk field password (tampil ikon show/hide).
 */
export default function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  name,
  showToggle = false,
  value,
  onChange,
}) {
  const [visible, setVisible] = useState(false);
  const inputType = showToggle ? (visible ? 'text' : 'password') : type;

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={inputType}
        id={id}
        name={name || id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {showToggle && (
        <span
          className="toggle-password"
          role="button"
          tabIndex={0}
          aria-label={visible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          onClick={() => setVisible((v) => !v)}
          onKeyDown={(e) => e.key === 'Enter' && setVisible((v) => !v)}
        >
          {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </span>
      )}
    </div>
  );
}
