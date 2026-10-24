# CRITIQUE — TiketRemi — 2026-10-24 (Hari 15)

## Slop test (v3) + 3 hal paling template + yang dirombak
- Slop test: LULUS. Logo ditutup pun situs tetap dikenali: meja felt gelap + kartu remi raksasa + perintah "PILIH KARTUMU, BOS" + stempel SAH. Tidak ketuker dengan build sebelumnya (tidak ada build kartu remi).
- 3 hal paling template: (1) tombol "LIHAT KARTU / RIWAYAT TIKET" di hero — pola CTA ganda generik; (2) filter bar select standar; (3) kartu grid seragam.
- Dirombak 2: (1) hero tanpa hero marketing — perintah bandar langsung + kartu latar raksasa, CTA kedua mengarah ke riwayat (bukan "pelajari"); (2) grid jadi bento asimetris dipotong (span 2 kolom, rotasi, satu kartu bergeser) + kartu terpotong tepi di section. Filter bar dipertahankan karena fungsinya (setelan meja) dan diberi suara persona.

## Gerbang gerak (v4): jumlah lapisan, zoom, pan, 2 marquee, FPS 4x (angka)
- Lapisan: A parallax 5 layer (felt, kartu A, kartu K, chip, stempel) + zoom-out penutup · B 2 marquee arah berlawanan + skew velocity · C split-huruf reveal · D tilt 3D pointer · E clip-path lingkaran buka panel detail. Total 5 kategori (A–E), F tidak dipakai (dipangkas sadar).
- Zoom: ada (zoom-out penutup + parallax scale implisit). Pan horizontal: TIDAK ada pin-scroll horizontal (layout bento vertikal; pan diganti tilt + parallax — dicatat sebagai penyimpangan sadar, bukan klaim palsu).
- 2 marquee: ya. FPS 4x: 59,4–60,5 (Chromium, 2 kali ukur). Reduced-motion: 0 animasi berjalan.

## Gerbang v5: tes bandingkan, blur, 3 detik, keyboard-only, reduced-motion, mode ringan
- Tes bandingkan (vs WartegKaset, PetaArisan, KarcisParkir): beda total — felt gelap pink vs hijau-kaset vs peta riso vs kertas hijau-kuning. LULUS.
- Tes blur: komposisi kartu raksasa + judul serif raksasa + stempel masih khas. LULUS.
- Tes 3 detik: perintah "PILIH KARTUMU, BOS" + kartu terlihat seketika. LULUS (setelah rombak putaran 1, lihat bawah).
- Keyboard-only: Tab → filter → kartu → detail → kelas → stepper → cetak → salin; Esc menutup detail. LULUS (diuji manual via struktur + Playwright klik; navigasi panah antar kartu tidak diimplementasikan — Tab sudah mencakup semua fungsi).
- Reduced-motion: dites qa.js (0 animasi) + toggle Gerak. LULUS.
- Mode ringan: toggle Gerak mematikan parallax/tilt/marquee; kartu tetap berfungsi. LULUS.

## Budget performa + Lighthouse (mobile/desktop)
- JS: app.js ~18 KB (tanpa dependensi). CSS ~9,7 KB. Font: 114 KB woff2 latin (6 file). Gambar di atas fold: 0 raster (semua SVG/CSS).
- Lighthouse: TIDAK TERUKUR di VM — chrome-launcher gagal (preseden 2026-10-16 s.d. 10-23, error sama). TIDAK dikarang angkanya; dicatat jujur di README. Pengganti bukti: qa.js exit 0 (chromium + webkit), FPS 4x ≥59, 0 console issue, 0 overflow.

## Keamanan + lisensi
- Keamanan: deep-link + localStorage divalidasi (id harus ada di DATA, kelas harus di MULT, jumlah 1–8, JSON try/catch + cek versi/skema). Render kartu/tiket pakai textContent/createElement — tanpa innerHTML untuk data. Clipboard ada fallback. Tidak ada tracker, API key, atau data pribadi.
- Lisensi: font OFL (Tai Heritage Pro, Alegreya Sans SC, Fugaz One) self-host; ikon SVG digambar sendiri; grain feTurbulence buatan sendiri; semua konten fiktif berlabel CONTOH — tidak ada merek/karakter berlisensi.

## Skor 1-10: karakter, keunikan, kerapian
- Karakter 9, keunikan 9, kerapian 8 (kerapian 8 karena hero atas masih lapang + lapisan bawah terpotong viewport — dekoratif, bukan cacat fungsi).

## Keputusan konflik aturan (kalau ada) + daftar dipangkas
- Konflik 1: seed minta "variable font axis" — Tai Heritage Pro BUKAN variable → diganti split-huruf + tukar weight (disahkan v5 ATURAN 6).
- Konflik 2: v4 minta pan horizontal pinned — dipangkas karena layout bento vertikal; diganti tilt + parallax (fungsi & keterbacaan menang, v5 ATURAN 0 butir 7).
- Dipangkas: lapisan F (shader/fisika), navigasi panah antar kartu, audio mikro, video hero moment (capture.js tidak dijalankan — screenshot + og-image sudah cukup; video dicatat dipangkas, bukan diklaim ada).

## Putaran rombak ke-1 dan ke-2
- Putaran 1 (dari screenshot mobile 390): lapisan K♠ menutupi headline "BOS." + chip TR menabrak tombol. Perbaikan: lapisan dipindah (A ke pojok atas, K ke bawah, chip/stempel ke bawah), opacity diturunkan, z-index eksplisit. Screenshot ulang: headline bersih. Putaran 2 tidak diperlukan.
- Putaran tambahan (dari tes fungsi): odometer total balapan saat klik stepper cepat (nilai tengah 128.297 tertangkap) → perbaiki dengan cancelAnimationFrame frame sebelumnya; tes ulang: total Rp330.000 benar (110.000 × 3).
