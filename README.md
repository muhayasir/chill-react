# Chill (React JS)

Konversi dari HTML/CSS statis (index.html, login.html, register.html) menjadi React JS,
sesuai instruksi mission: component-based, reusable via props, dan responsive.

## Struktur folder

```
src/
  context/AuthContext.jsx -> state login sederhana (persist ke localStorage)
  routes/
    ProtectedRoute.jsx    -> lindungi halaman Home, lempar ke /login kalau belum login
    PublicOnlyRoute.jsx   -> lempar ke Home kalau Login/Register dibuka saat sudah login
  components/        -> UI component reusable (dipakai lebih dari 1 tempat / menerima props)
    Navbar/
    HeroSection/
    MovieCard/        -> kartu film, punya varian "overlay" & "plain"
    MovieCarousel/     -> baris carousel film, menerima title & data via props
    Footer/
    FooterColumn/      -> kolom footer reusable (Genre & Bantuan)
    AuthCard/          -> wrapper form reusable untuk Login & Register
    InputField/        -> input reusable dengan toggle show/hide password
    Button/            -> tombol reusable (primary / google)
  pages/
    Home/     -> halaman beranda (index.html)
    Login/    -> halaman masuk (login.html)
    Register/ -> halaman daftar (register.html)
  data/       -> "data" film, genre, menu navbar (sebagai props ke component)
```

## Cara menjalankan

1. **Salin folder `images` dari project HTML lama ke `public/images`.**
   Semua path gambar di kode (contoh `/images/logo-chill.png`) mengacu ke folder ini,
   jadi tinggal drop folder `images` lama ke dalam `public/`.
2. Install dependency:
   ```bash
   npm install
   ```
3. Jalankan mode development:
   ```bash
   npm run dev
   ```
4. Build untuk production:
   ```bash
   npm run build
   ```

## Ikon (Ionicons)

Beberapa ikon UI yang sebelumnya berupa file gambar (`vector.png`, `eye-off.png`,
`Sound-off.png`, `star.png`, `login-variant.png`, `account.png`, avatar navbar) sudah
diganti dengan **Ionicons** lewat package [`react-icons`](https://react-icons.github.io/react-icons/icons/io5)
(`react-icons/io5`), sehingga tidak butuh file gambar lagi untuk ikon-ikon tersebut:

| Fungsi                              | Ionicon                                  |
| ------------------------------------ | ----------------------------------------- |
| Dropdown toggle (chevron navbar)     | `IoChevronDownOutline`                    |
| Avatar profil di navbar              | `IoPersonCircleOutline`                   |
| Menu "Profil Saya"                   | `IoPersonOutline`                         |
| Menu "Ubah Premium"                  | `IoStarOutline`                           |
| Menu "Keluar"                        | `IoLogOutOutline`                         |
| Show/hide password                   | `IoEyeOutline` / `IoEyeOffOutline`        |
| Tombol volume di HeroSection         | `IoVolumeHighOutline` / `IoVolumeMuteOutline` |

Logo Google di tombol "Masuk/Daftar dengan Google" tetap pakai gambar (`logo-google.png`)
karena itu logo brand, bukan ikon umum — Ionicons tidak menyediakan logo brand pihak ketiga.

## Alur login

- Saat web pertama dibuka (`/`), kalau belum login otomatis diarahkan ke `/login`.
- Isi form Login atau Register lalu submit -> `login()` dipanggil (menyimpan status login
  di `localStorage`) dan langsung diarahkan ke halaman Home (`/`).
- Selama status login masih tersimpan, membuka `/login` atau `/register` akan otomatis
  dialihkan balik ke Home (tidak bisa dibuka lagi selagi sudah login).
- Klik menu **Keluar** di dropdown navbar akan logout dan kembali ke halaman Login.
- Form ini masih memakai autentikasi "dummy" (submit apa saja dianggap berhasil login) —
  ganti isi `handleSubmit` di `Login.jsx`/`Register.jsx` dengan pemanggilan API asli kalau
  sudah ada backend.

## Catatan implementasi (sesuai Guideline & Instruction di PPT)

- **Slicing UI berdasarkan hierarki**: tiap bagian halaman (Navbar, HeroSection, MovieCard,
  MovieCarousel, Footer, FooterColumn, AuthCard, InputField, Button) dipecah jadi komponen
  terpisah dengan folder & CSS masing-masing.
- **Reusable component + props**: `MovieCarousel` & `MovieCard` dipakai ulang untuk 4 section
  film berbeda hanya dengan mengganti props `title`, `movies`, `columns`, `variant`.
  `AuthCard`, `InputField`, dan `Button` dipakai bersama oleh halaman Login & Register.
- **Routing**: menggunakan `react-router-dom` untuk berpindah antar halaman `/`, `/login`,
  `/register` (menggantikan link `<a href="login.html">` dengan `<Link to="/login">`).
- **Responsive**: seluruh media query asli (breakpoint 1024px & 768px) dipindahkan apa adanya
  ke file CSS komponen masing-masing, jadi tampilan mobile tetap sama seperti versi HTML asli.
- Field password memiliki state show/hide sendiri di dalam komponen `InputField`.
