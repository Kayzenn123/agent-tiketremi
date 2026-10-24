# TiketRemi — Hari 15, 30 Days of Code

Setumpuk kartu remi raksasa yang dibagikan Bang Dealer. Satu kartu = satu konser fiktif.
Pilih kartu, balik kartunya, pilih kelas + jumlah, cetak tiket bernomor.

## Fitur
- 16 konser fiktif (nama band karangan) — filter kota, genre, cari, urutkan, kocok ulang
- Detail kartu dengan reveal clip-path lingkaran, kelas Reguler/Festival/VIP, stepper jumlah, total odometer live
- Cetak tiket bernomor (TR-2026-XXXX), riwayat di localStorage berversi (`tiketremi-v1`)
- Deep-link `?konser=&kelas=&jml=` · ekspor JSON riwayat · salin ringkasan WA + salin tautan kartu (dengan fallback)
- Easter egg: ketik `kocok` → grid dikocok ulang
- Aksesibilitas: skip link, toggle Gerak, tombol jeda marquee, Esc menutup detail, hormat prefers-reduced-motion, keyboard-only penuh

## Semua harga = CONTOH
Nama band, jadwal, venue, dan harga adalah karangan. Bukan penjualan tiket beneran.
Jangan transfer ke siapa pun atas nama TiketRemi.

## Tech
Tanpa build, tanpa dependensi: `index.html` + `styles.css` + `app.js`.
Font OFL self-host (Tai Heritage Pro, Alegreya Sans SC, Fugaz One — 114 KB woff2 latin).
Ikon SVG digambar sendiri. Grain: filter feTurbulence.

## Skor terverifikasi
- tools/qa.js: exit 0 di Chromium DAN WebKit — 4 viewport, 0 overflow, 0 console issue, 0 tap-target kecil, 1 h1, lang=id
- FPS CPU throttle 4x: 59,4–60,5 · reduced-motion: 0 animasi berjalan
- Tes fungsi Playwright: 16 kartu awal → filter Medan = 2 kartu → pilih → cetak (nomor TR-2026-XXXX) → localStorage tersimpan → deep-link VIP ×2 = Rp750.000 benar
- Lighthouse: TIDAK TERUKUR di VM (chrome-launcher gagal; preseden 2026-10-16 s.d. 10-23). Angka tidak dikarang.

## Jalankan lokal
```sh
python3 -m http.server 8901
# buka http://localhost:8901/index.html
```
