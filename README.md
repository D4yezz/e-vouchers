# E-Vouchers — Digital Product E-Commerce

## 📌 Overview

E-Vouchers adalah aplikasi e-commerce berbasis web untuk pembelian paket data internet.
Aplikasi ini dirancang untuk meningkatkan **conversion rate**, **page per visit**, dan **kecepatan checkout** melalui alur yang sederhana dan efisien.

---

## 🧱 Struktur Project

```bash
root/
├── server/                 # Mock backend (json-server)
│   └── db.json
│
├── src/
│   ├── components/         # Reusable UI components (Card, Button, Input)
│   ├── features/           # Module berdasarkan fitur (auth, paketData, checkout, transaction)
│   ├── lib/                # Berisi route yang digunakan dan protected route
│   ├── pages/              # Halaman utama (Login, Dashboard, PaketData, dll)
│   ├── services/           # API abstraction layer (service pattern)
│   ├── store/              # Global state menggunakan Zustand
│   ├── utils/              # Helper functions
│   └── App.jsx
│
└── package.json
```

### Penjelasan:

* **server/** → Menyimpan mock backend menggunakan json-server
* **features/** → Mengelompokkan kode berdasarkan fitur agar scalable
* **services/** → Menangani komunikasi API agar terpusat
* **store/** → Menyimpan global state menggunakan Zustand
* **components/** → Komponen UI reusable
* **pages/** → Entry point setiap halaman

---

## 🧠 Alasan Design Decision

### 1. Feature-Based Structure

Saya menggunakan struktur berbasis fitur untuk:

* Mempermudah pengembangan dan penambahan fitur baru
* Menghindari file besar yang sulit dikelola
* Meningkatkan keterbacaan kode

---

### 2. State Management dengan Zustand

Zustand dipilih karena:

* Ringan dan minim boilerplate
* Mudah diintegrasikan
* Cocok untuk kebutuhan global state seperti authentication dan transaksi

Pendekatan:

* Global state → Zustand (auth, transaksi)
* Local state → useState (UI & filter)

---

### 3. API Abstraction Layer (Service Pattern)

Semua request API dipisahkan ke folder `services/`.

Tujuan:

* Menghindari duplikasi fetch di berbagai component
* Mempermudah perubahan endpoint
* Membuat component lebih fokus ke UI

---

### 4. UI & UX Simplicity

Desain dibuat sederhana dengan fokus pada:

* Navigasi yang jelas
* Checkout yang cepat
* Feedback yang informatif (loading, error, empty state)

---

## ⚖️ Trade-offs

### 1. Client-side Filtering & Pagination

**Dipilih:** Client-side
**Alasan:** Lebih cepat diimplementasikan dengan json-server

**Konsekuensi:**

* Kurang optimal untuk data besar (10.000+ item)
* Pada production, seharusnya menggunakan server-side filtering

---

### 2. Zustand

**Dipilih:** Zustand

**Alasan:**

* Mengurangi kompleksitas
* Lebih cepat dikembangkan dalam waktu terbatas

**Konsekuensi:**

* Tidak ada built-in caching & refetch otomatis
* Harus mengelola loading & error state secara manual

---

### 3. UI Sederhana

**Dipilih:** Fokus ke fungsionalitas

**Alasan:**

* Prioritas pada UX dan penyelesaian fitur dalam waktu terbatas

**Konsekuensi:**

* Tampilan tidak terlalu kompleks atau interaktif

---

### 4. Tanpa Optimistic UI

**Dipilih:** Tidak diimplementasikan

**Alasan:**

* Menghindari kompleksitas tambahan

**Konsekuensi:**

* UX tidak secepat aplikasi production-level

---

## 🚀 Cara Instalasi & Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/D4yezz/e-vouchers.git
cd e-vouchers
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Jalankan Mock Backend (json-server)

Pastikan file `db.json` berada di folder `server/`

```bash
npx json-server --watch server/db.json --port 3000
```

---

### 4. Jalankan Frontend

```bash
npm run dev
```

---

### 5. Akses Aplikasi

Buka browser dan akses:

```
http://localhost:5173
```

---


## 🎯 Kesimpulan

Project ini dirancang dengan fokus pada:

* Struktur yang jelas dan scalable
* Pengelolaan state yang efisien
* Pengalaman pengguna yang sederhana dan cepat

Pendekatan yang dipilih mempertimbangkan keseimbangan antara **kualitas code**, **waktu pengerjaan**, dan **kebutuhan fitur** dalam technical test ini.
