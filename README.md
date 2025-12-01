# Energy Monitor System

Sistem monitoring energi listrik berbasis web dengan desain modern, responsif, dan fitur manajemen lengkap untuk administrator maupun pengguna.

## 📚 Dokumentasi Fitur & Fungsionalitas Sistem

Berikut adalah penjelasan detail mengenai fitur-fitur yang tersedia pada setiap halaman aplikasi web Energy Monitor.

### A. Fitur Berbasis Halaman (Page-by-Page)

#### 1. Halaman Login & Landing (`index.html`)

Gerbang utama keamanan sistem yang dirancang dengan antarmuka minimalis.

- **Multi-Level Login:** Membedakan hak akses antara **Administrator** (akses penuh ke pengaturan sistem) dan **User** (akses monitoring area spesifik).
- **Secure Entry:** Validasi input username dan password untuk mencegah akses tanpa izin.
- **Responsive Layout:** Tampilan login yang fleksibel, tetap rapi saat diakses dari perangkat Mobile maupun Desktop.
- **Fitur Show/Hide Password:** Ikon mata interaktif untuk melihat password yang diketik.

  ```html
  <!-- Struktur Input Login Minimalis -->
  <div class="input-group-minimal mb-3">
    <i class="bi bi-lock"></i>
    <input type="password" class="form-control" placeholder="Password" />
    <button class="password-eye"><i class="bi bi-eye"></i></button>
  </div>
  ```

#### 2. Modul Administrator (`admin/`)

Pusat kendali penuh bagi pengelola gedung atau sistem energi.

- **Dashboard Utama (`dashboard-admin.html`):**

  - **Statistik Real-time:** Kartu ringkasan yang menampilkan Total Perangkat, Perangkat Aktif, Pengguna Aktif, dan Total Konsumsi (kWh).
  - **Visualisasi Data:** Grafik garis interaktif (menggunakan Chart.js) untuk memantau tren beban energi vs waktu.
  - **Activity Log:** Riwayat aktivitas sistem terbaru, mencatat kejadian seperti "Perangkat baru ditambahkan" atau "Peringatan sistem".
  - **Quick Actions:** Grid tombol pintas untuk akses cepat ke menu vital (Tambah Perangkat, Unduh Laporan, dll).

    ```css
    /* CSS Grid Responsif untuk Aksi Cepat */
    .quick-actions-grid {
      display: grid;
      grid-template-columns: 1fr; /* Mobile: 1 kolom vertikal */
      gap: 0.75rem;
    }
    @media (min-width: 992px) {
      .quick-actions-grid {
        grid-template-columns: repeat(4, 1fr); /* Desktop: 4 kolom */
      }
    }
    ```

  - **Tabel Perangkat Kritis:** Menampilkan daftar perangkat yang sedang _Offline_ atau dalam status _Warning_ agar segera ditindaklanjuti.

- **Manajemen Perangkat (`admin-perangkat.html`):**

  - **Inventory Control:** Tabel lengkap daftar seluruh perangkat IoT yang terhubung.
  - **Status Monitoring:** Indikator visual (Badge warna) untuk status perangkat: Online (Hijau), Offline (Merah), Warning (Kuning).

    ```html
    <!-- Contoh Badge Status -->
    <td><span class="badge bg-success">Online</span></td>
    <td><span class="badge bg-danger">Offline</span></td>
    ```

  - **CRUD Operations:** Fitur lengkap untuk Menambah, Mengedit, dan Menghapus perangkat melalui antarmuka Modal (Pop-up).
  - **Pencarian & Filter:** Kolom pencarian untuk menemukan perangkat spesifik dengan cepat.

- **Laporan & Analisis (`admin-laporan.html`):**

  - **Advanced Filtering:** Fitur penyaringan data laporan berdasarkan Periode (Mingguan/Bulanan), Rentang Tanggal Custom, dan Lokasi.
  - **Cost Calculation:** Estimasi biaya listrik otomatis berdasarkan total konsumsi kWh.
  - **Export Tools:** Tombol untuk mengunduh laporan dalam format **PDF**, **Excel**, dan **CSV**.
  - **Visualisasi Distribusi:** Grafik Donut/Pie untuk melihat proporsi konsumsi energi per lokasi.

- **Manajemen Tips (`admin-tips.html`):**
  - **Content Management System (CMS):** Editor sederhana untuk membuat dan mengelola konten edukasi hemat energi.
  - **Status Publikasi:** Mengatur visibilitas tips, apakah masih "Draft" (disimpan) atau "Published" (tampil di sisi user).
  - **Kategorisasi:** Pengelompokan tips berdasarkan topik (Pencahayaan, Pendinginan, Elektronik).

#### 3. Modul Pengguna (`user/`)

Antarmuka yang disederhanakan untuk penghuni atau staf umum.

- **Dashboard User (`dashboard-user.html`):**
  - **Monitoring Personal:** Fokus pada statistik konsumsi energi di area tanggung jawab pengguna saja.
  - **Status Perangkat Area:** Memantau status perangkat yang relevan dengan lokasi pengguna.
- **Grafik Personal (`user-grafik.html`):**

  - **Riwayat Konsumsi:** Grafik batang/garis untuk membandingkan pemakaian energi harian.
  - **Analisis Tren:** Membantu pengguna memahami pola pemakaian energi mereka sendiri.

- **Katalog Tips (`user-tips.html`):**
  - **Edukasi:** Daftar tips hemat energi yang telah dipublikasikan oleh admin.
  - **Filter Kategori:** Memudahkan pencarian tips berdasarkan topik tertentu.

---

### B. Fitur Teknis & Unggulan (Technical Features)

Selain fitur visual, sistem ini dibangun dengan fondasi teknis yang kuat:

1.  **Desain Responsif (Mobile-First):**
    Sistem menggunakan _Grid System_ dan _Flexbox_ yang otomatis menyesuaikan tampilan.

    - **Desktop:** Sidebar navigasi tetap di kiri, layout multi-kolom.
    - **Mobile:** Sidebar berubah menjadi _Off-canvas menu_ dengan tombol toggle, tabel data dapat digeser (scrollable), dan kartu statistik menyesuaikan lebar layar.

2.  **Visualisasi Data Interaktif:**
    Menggunakan library **Chart.js** untuk merender data angka menjadi grafik yang mudah dipahami, responsif, dan interaktif (tooltip saat di-hover).

    ```javascript
    // Inisialisasi Grafik Garis (Chart.js)
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', ...],
            datasets: [{
                label: 'Konsumsi (kWh)',
                data: [4200, 4500, 4100, ...],
                borderColor: '#0d6efd',
                tension: 0.4 // Garis melengkung halus
            }]
        }
    });
    ```

3.  **Antarmuka Modern (UI/UX):**

    - **Bootstrap 5:** Framework CSS untuk komponen antarmuka yang konsisten dan modern.
    - **AOS (Animate On Scroll):** Animasi halus saat elemen halaman dimuat atau digulir.
    - **Bootstrap Icons:** Ikon vektor yang tajam dan ringan.

4.  **Manajemen Tabel Data:**
    Tabel dilengkapi dengan fitur _Responsive Wrapper_ dan integrasi **DataTables** (pada halaman admin) untuk fitur pencarian, pengurutan (sorting), dan penomoran halaman (pagination) otomatis.

    ```html
    <!-- Wrapper Tabel Responsif -->
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <!-- Konten Tabel -->
      </table>
    </div>
    ```

---

## 📂 Struktur Proyek

```
PBL/
├── index.html                      # Halaman Login
├── admin/                          # Modul Administrator
│   ├── dashboard-admin.html        # Dashboard Utama
│   ├── admin-perangkat.html        # Manajemen Perangkat
│   ├── admin-laporan.html          # Laporan & Analisis
│   └── admin-tips.html             # Manajemen Tips
├── user/                           # Modul Pengguna
│   ├── dashboard-user.html         # Dashboard User
│   ├── user-grafik.html            # Grafik Personal
│   └── user-tips.html              # Katalog Tips
├── css/
│   └── styles.css                  # Stylesheet Utama (Custom CSS)
└── js/
    └── main.js                     # Logika JavaScript Utama
```

## 🛠️ Teknologi yang Digunakan

- **HTML5 & CSS3:** Struktur dan styling halaman.
- **Bootstrap 5.3.3:** Framework CSS responsif.
- **JavaScript (Vanilla + jQuery):** Logika interaktifitas.
- **Chart.js:** Library visualisasi grafik.
- **DataTables:** Plugin manajemen tabel canggih.
- **AOS (Animate On Scroll):** Library animasi scroll.
- **Bootstrap Icons:** Set ikon vektor.

## 🚀 Cara Menjalankan (Getting Started)

1.  **Clone atau Download** repositori ini.
2.  Buka file `index.html` menggunakan web browser modern (Chrome, Edge, Firefox).
3.  **Login** menggunakan kredensial demo berikut:
    - **Admin:** Username `admin`, Password `admin123`
    - **User:** Username `user`, Password `user123`
4.  Jelajahi fitur-fitur dashboard.

---

_Dikembangkan untuk Proyek PBL (Project Based Learning) - Energy Monitor System._
