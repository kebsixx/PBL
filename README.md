# Energy Monitor Dashboard - Minimalist Design

Dashboard monitoring energi listrik dengan desain minimalis dan modern. Admin panel menggunakan **sidebar hijau gradasi** tema energi dengan quick action buttons, sedangkan user panel menggunakan top navbar yang clean.

## 📋 Struktur Proyek

```
PBL/
├── index.html                      # Login page minimalis
├── admin/                          # Admin panel dengan sidebar
│   ├── dashboard-admin.html        # Admin dashboard
│   ├── admin-perangkat.html        # Manajemen perangkat IoT
│   ├── admin-laporan.html          # Laporan & ekspor data
│   └── admin-tips.html             # Manajemen tips energi
├── user/                           # User panel dengan navbar
│   ├── dashboard-user.html         # User dashboard
│   ├── user-grafik.html            # Grafik & analisis data
│   └── user-tips.html              # Tips hemat energi
├── css/
│   └── styles.css                  # Main CSS (1500+ lines)
├── js/
│   └── main.js                     # Main JavaScript (700+ lines)
└── README.md                       # Dokumentasi lengkap
```

## 🎨 Desain Minimalis

### Prinsip Desain:

- **Ultra Clean & Simple**: Whitespace optimal, tidak cluttered
- **Card-based Layout**: Setiap konten dalam card minimal dengan shadow halus
- **Modern Flat Design**: Shadow minimal, gradasi subtle, fokus pada konten
- **Typography**: Font Inter untuk tampilan modern, clean dan readable
- **Color Palette**: Gradasi hijau-teal untuk admin, warna soft dengan aksen jelas
- **Responsive First**: Mobile-optimized, tidak ada horizontal scroll

### Komponen UI:

- **login-page-minimal**: Full gradient background dengan floating box
- **stat-card-minimal**: Card statistik dengan icon dan nilai (2 kolom di mobile)
- **card-minimal**: Card konten standar dengan header dan body (equal height)
- **quick-action-btn**: Button grid 4 kolom desktop, 2 kolom mobile dengan aspect ratio 1.1
- **tip-card-minimal**: Card khusus untuk tips hemat energi dengan hover effect
- **device-card-minimal**: Card untuk status perangkat dengan icon dan badge
- **badge-\*-minimal**: Badge dengan background transparan dan icon
- **filter-btn**: Tombol filter dengan border radius penuh dan active state

## 👤 User Panel

### 1. Dashboard User (dashboard-user.html)

**Fitur:**

- 4 Stat cards: Konsumsi hari ini, Biaya, Perangkat aktif, Rata-rata
- Quick chart preview konsumsi 7 hari terakhir
- Preview tips hemat energi (3 tips)
- Status perangkat terpilih

**Navigasi:**

- Dashboard (active)
- Grafik Data → user-grafik.html
- Tips Hemat → user-tips.html
- Logout → index.html

### 2. Grafik Data (user-grafik.html)

**Fitur:**

- Filter periode: Harian, Mingguan, Bulanan
- Main chart: Konsumsi energi per waktu
- Device breakdown chart: Pie chart per perangkat
- Time distribution chart: Bar chart per waktu (Pagi/Siang/Sore/Malam)
- 4 Stat cards ringkasan

**Navigasi:**

- Dashboard → dashboard-user.html
- Grafik Data (active)
- Tips Hemat → user-tips.html
- Logout → index.html

### 3. Tips Hemat Energi (user-tips.html)

**Fitur:**

- Search bar untuk cari tips
- Filter kategori: Semua, Pencahayaan, Elektronik, Pendinginan, Umum
- 6+ Tips cards dengan icon, judul, deskripsi, dan potensi hemat
- Responsive card grid layout

**Navigasi:**

- Dashboard → dashboard-user.html
- Grafik Data → user-grafik.html
- Tips Hemat (active)
- Logout → index.html

## 🔐 Admin Panel

### 1. Dashboard Admin (dashboard-admin.html)

**Fitur:**

- 4 Stat cards: Total perangkat, Perangkat aktif, Pengguna aktif, Total konsumsi
- Quick actions: Tambah perangkat, Unduh laporan, Kelola tips, Pengaturan
- System status chart (dual line chart)
- Recent activities log
- Device status table (perangkat kritis)

**Navigasi:**

- Dashboard (active)
- Perangkat → admin-perangkat.html
- Laporan → admin-laporan.html
- Tips Energi → admin-tips.html
- Logout → index.html

### 2. Manajemen Perangkat (admin-perangkat.html)

**Fitur:**

- 4 Quick stats: Online, Offline, Warning, Total
- DataTables dengan search & pagination
- Kolom: ID, Nama, Lokasi, Tipe, Status, Konsumsi, Update, Aksi
- Modal tambah perangkat (form lengkap)
- Modal edit perangkat
- Delete confirmation

**Navigasi:**

- Dashboard → dashboard-admin.html
- Perangkat (active)
- Laporan → admin-laporan.html
- Tips Energi → admin-tips.html
- Logout → index.html

### 3. Laporan Data (admin-laporan.html)

**Fitur:**

- Filter periode, tanggal, dan lokasi
- Export buttons: PDF, Excel, CSV
- 4 Summary stats
- Trend chart (bar chart konsumsi)
- Distribution chart (doughnut per lokasi)
- DataTables detail konsumsi per perangkat

**Navigasi:**

- Dashboard → dashboard-admin.html
- Perangkat → admin-perangkat.html
- Laporan (active)
- Tips Energi → admin-tips.html
- Logout → index.html

### 4. Manajemen Tips (admin-tips.html)

**Fitur:**

- 4 Stats: Total tips, Published, Draft, Total views
- DataTables dengan filter
- Kolom: ID, Judul, Kategori, Potensi hemat, Status, Views, Update, Aksi
- Modal tambah tips (form lengkap)
- Modal edit tips
- Delete confirmation

**Navigasi:**

- Dashboard → dashboard-admin.html
- Perangkat → admin-perangkat.html
- Laporan → admin-laporan.html
- Tips Energi (active)
- Logout → index.html

## 🔑 Login

**Desain**: Ultra minimalis dengan gradient background, icon besar, dan input dengan icon inline

**Admin Panel** (Sidebar Hijau):

- Username: `admin`
- Password: `admin123` (atau `admin` saja)
- Redirect: `admin/dashboard-admin.html`

**User Panel** (Top Navbar):

- Username: `user`
- Password: `user123` (atau `user` saja)
- Redirect: `user/dashboard-user.html`

**Fitur Login:**

- Password toggle visibility (eye icon)
- Gradient background hijau-biru
- Input dengan icon di dalam
- Demo credentials ditampilkan

## 🛠️ Technologies Used

### Frontend Framework & Libraries:

- **Bootstrap 5.3.3**: CSS framework
- **Bootstrap Icons 1.11.3**: Icon library
- **Chart.js**: Data visualization
- **jQuery 3.7.0**: JavaScript library
- **DataTables 1.13.6**: Table plugin
- **AOS 2.3.1**: Scroll animations
- **Google Fonts (Inter)**: Typography

### Custom Code:

- **css/styles.css**: 700+ lines CSS minimalis custom
- **js/main.js**: 650+ lines JavaScript untuk semua interaktivitas

## 📱 Responsive Design

Dashboard fully responsive dan mobile-optimized untuk:

- **Desktop**: >= 992px (optimal experience dengan 4 kolom quick actions)
- **Tablet**: 768px - 991px (quick actions 2 kolom, stats tetap horizontal)
- **Mobile**: <= 767px (layout optimized, no horizontal scroll)
- **Mobile Small**: <= 576px (stats menjadi vertikal/centered)

### Breakpoint adjustments:

- **Login**: Box padding menyesuaikan, gradient tetap full
- **Stats cards**: 2 kolom di semua ukuran mobile (col-6), vertikal hanya di ≤576px
- **Quick actions**: 4 kolom desktop → 2 kolom mobile dengan aspect ratio 1.1-1.2
- **Navbar**: Collapse menu di mobile dengan padding optimal (tidak terlalu center)
- **Admin sidebar**: Hidden di mobile dengan floating toggle button + overlay
- **Tables**: Responsive scrolling dengan font size dikurangi
- **Charts**: Canvas max-height 240px desktop, 200px mobile
- **Spacing**: Padding dikurangi di mobile (1rem → 0.75rem)
- **Typography**: Font size menyesuaikan per breakpoint
- **No horizontal scroll**: overflow-x: hidden pada html dan body

### Mobile Features:

- Floating hamburger button untuk admin sidebar (bottom-right)
- Overlay hitam transparan saat sidebar terbuka
- Auto-close sidebar saat klik link atau overlay
- Touch-friendly button sizes
- Optimized gap dan padding untuk mobile

## 🎯 Key Features

### User Side:

✅ Real-time energy monitoring
✅ Interactive charts dengan multiple views
✅ Tips hemat energi dengan filter & search
✅ Device status monitoring
✅ Responsive & mobile-friendly

### Admin Side:

✅ Sidebar hijau gradasi dengan fixed position
✅ Quick actions grid (4 tombol shortcut berbentuk kotak)
✅ Device management (CRUD operations)
✅ User activity monitoring
✅ Data report generation & export
✅ Tips content management
✅ System status overview dengan dual chart
✅ DataTables untuk data besar
✅ Mobile sidebar dengan toggle button dan overlay

## 🚀 Getting Started

1. **Clone atau extract project**
2. **Buka index.html** di browser
3. **Login dengan credentials:**
   - Admin: `admin` / `admin123`
   - User: `user` / `user123`
4. **Explore features!**

## 📝 Notes

- Semua data saat ini adalah **dummy data** untuk demo
- Di production, integrasikan dengan backend API untuk:
  - Autentikasi real
  - CRUD operations ke database
  - Real-time data dari IoT devices
  - Export functionality (PDF/Excel/CSV)

## 🔄 Backup Files

File backup tersimpan untuk referensi:

- `dashboard-admin.html.backup` - Admin dashboard versi lama
- `dashboard-user.html.backup` - User dashboard versi lama
- `css/styles.css.backup` - CSS versi lama (801 lines)
- `js/main.js.backup` - JavaScript versi lama (409 lines)

## 📦 File Sizes

- **index.html**: ~2.8 KB (ultra minimal login)
- **dashboard-user.html**: ~11.5 KB
- **user-grafik.html**: ~9.5 KB
- **user-tips.html**: ~7.8 KB
- **dashboard-admin.html**: ~10.8 KB
- **admin-perangkat.html**: ~12.8 KB
- **admin-laporan.html**: ~11.2 KB
- **admin-tips.html**: ~13.5 KB
- **css/styles.css**: ~45 KB (1500+ lines with full responsive)
- **js/main.js**: ~22 KB (700+ lines with mobile sidebar)

**Total Project Size**: ~147 KB (excluding libraries from CDN)

### Lines of Code:

- **CSS**: 1554 lines (comprehensive responsive design)
- **JavaScript**: 730+ lines (full interactivity + mobile features)

## 🎨 Color Palette

```css
Primary Blue:       #0d6efd
Energy Green:       #10b981 (admin theme)
Energy Teal:        #14b8a6 (gradient pair)
Success Green:      #198754
Danger Red:         #dc3545
Warning Yellow:     #ffc107
Info Cyan:          #0dcaf0
Gray Scale:         #f8f9fa, #e9ecef, #dee2e6, #6c757d, #343a40, #212529

Gradients:
- Admin Sidebar:    linear-gradient(135deg, #10b981, #14b8a6)
- Login Background: linear-gradient(135deg, #10b981, #14b8a6, #0ea5e9)
- Quick Actions:    linear-gradient(135deg, #f8f9fa, #ffffff)
- Hover States:     linear-gradient(135deg, #10b981, #14b8a6)
```

## 📄 Browser Support

- Chrome/Edge: ✅ (recommended)
- Firefox: ✅
- Safari: ✅
- Opera: ✅
- IE11: ❌ (not supported)

## 👨‍💻 Development

Untuk modifikasi:

1. **CSS**: Edit `css/styles.css`

   - Gunakan CSS variables di `:root` untuk konsistensi
   - Follow naming convention: `component-minimal`
   - Responsive breakpoints: 992px, 768px, 576px
   - Aspect ratio untuk quick action buttons: 1.1 desktop, 1.2 mobile

2. **JavaScript**: Edit `js/main.js`

   - Setiap halaman punya initialize function
   - `initializeMobileSidebar()` untuk admin sidebar toggle
   - Chart configs dapat diubah di section masing-masing
   - Password toggle di login page

3. **HTML**: Gunakan Bootstrap 5 classes + custom minimal classes

   - Grid system: `col-6 col-md-3` untuk stats (2 kolom mobile, 4 desktop)
   - Quick actions: 4 items dalam grid
   - Device cards: `col-sm-6 col-md-3` untuk responsive

4. **Responsive Tips**:
   - Gunakan `px-3 px-lg-4` untuk padding responsive
   - Stats cards col-6 di mobile untuk 2 kolom
   - Canvas max-height berbeda per breakpoint
   - Aspect ratio untuk quick actions agar tidak terlalu tinggi

## 📞 Support

Jika ada pertanyaan atau butuh modifikasi, silakan hubungi developer.

## 🔧 Technical Details

### CSS Architecture:

- **1554 lines** of well-organized CSS
- Modular sections: Login, Stats, Cards, Sidebar, Navbar, etc.
- 3 responsive breakpoints with detailed adjustments
- CSS Variables untuk easy theming
- No horizontal scroll dengan overflow control

### JavaScript Features:

- **730+ lines** of vanilla JavaScript
- Page-specific initialization functions
- Mobile sidebar with overlay and toggle
- Password visibility toggle
- Chart.js integration
- DataTables integration
- AOS scroll animations

### Performance:

- External CSS/JS (no inline styles)
- CDN libraries for faster loading
- Optimized images and icons from Bootstrap Icons
- Minimal JavaScript, no jQuery dependencies (except DataTables)

### Accessibility:

- Semantic HTML5
- Proper ARIA labels
- Keyboard navigation support
- Focus states visible
- Color contrast compliant

---

**Version**: 2.1 (Ultra Minimalist + Mobile Optimized)  
**Last Updated**: November 2025  
**Status**: ✅ Production Ready - Fully Responsive
