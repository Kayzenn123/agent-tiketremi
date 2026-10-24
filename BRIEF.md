# BRIEF — TiketRemi — 2026-10-24 (Hari 15)

## Masalah/usecase (1 kalimat + siapa yang kena)
Penonton konser bingung membandingkan jadwal/harga konser dari banyak poster berserakan — TiketRemi menyatukan semuanya jadi satu tumpukan kartu yang bisa dipilih, dibalik, dan dicetak tiketnya.

## Konsep visual (1 kalimat)
Seluruh situs = satu meja bandar kartu remi raksasa: bento asimetris yang sengaja dipotong tepi, tiap kartu = satu konser, klik kartu → kartu membalik jadi tiket bernomor.

## Hasil seed (ringkas, dari pick-seed.js; 7 penolakan anti-seragam)
- Seed dasar: 2026-11-01 (base 2026-10-24) — domain tiket konser · layout bento asimetris dipotong · referensi kartu remi · constraint grain/noise wajib
- Gerak: kamera parallax 5 layer + zoom out di akhir · marquee ikon SVG + teks · teks variable-axis · input tilt 3D · reveal clip-path lingkaran
- Ikon: outline tebal 3px sudut tajam (sumber Iconoir — digambar ulang sendiri sebagai SVG inline, lisensi aman)
- Font: Tai Heritage Pro (display) / Alegreya Sans SC (body) / Fugaz One (aksen) — self-host woff2 latin, total 114 KB
- Palet: dark/monochrome hue 333 — bg oklch(0.16 0.050 333), surface oklch(0.21 0.040 333), teks oklch(0.94 0.020 333), muted oklch(0.65 0.030 333), aksen oklch(0.61 0.236 333), aksen-2 oklch(0.57 0.170 333), pop oklch(0.86 0.243 189)

## 3 arah desain (2 kalimat masing-masing) + arah terpilih
1. **Meja kasino neon:** meja hijau + lampu neon, kartu melayang 3D. Terlalu dekat dengan klise kasino, dan neon di dark = blacklist v3.
2. **Arsip loket kertas:** semua kartu jadi arsip kertas krem, stempel pos. Rapi tapi sudah dipakai AntreSehat hari ini (papan kertas) dan KarcisParkir (kertas riso).
3. **Meja bandar kartu remi gelap (TERPILIH):** felt gelap hue 333 + tinta merah muda kartu + stempel mint pop, kartu dipotong tepi bento, grain kasar. PALING JAUH dari 14 build terakhir (tidak ada build kartu remi; tidak ada dark-monokrom-pink; tidak ada bento dipotong).

## Keputusan berani
Tanpa navbar dan tanpa hero marketing — pengunjung langsung disodori tumpukan kartu + perintah "PILIH KARTUMU, BOS". Navigasi = filter sebagai "setelan meja" + tombol transport bandar di bawah. Satu kartu sengaja terpotong di tepi layar (bento dipotong, bukan bug).

## Persona/suara
"Bang Dealer" — bandar kartu santai, bahasa Betawi-Jakarta ringan, konsisten sampai pesan error ("Kartu lu belum dipilih, Bos!"), empty state ("Meja lagi kosong, Bos — ubah setelan mejanya."), dan footer.

## Palet (harmoni, kenapa, psikologi warna, token final, cek kontras AA)
- Harmoni monokrom hue 333 (pink-merah remi) + pop mint 189 sebagai kejutan <5% area (stempel). Psikologi: felt gelap = meja malam yang fokus; pink = kartu + urgensi; mint = cap "SAH" yang menenangkan.
- Token final (oklch): --bg 0.16 0.050 333 · --surface 0.21 0.040 333 · --text 0.94 0.020 333 · --muted 0.78 0.030 333 (dinaikkan dari 0.65 seed demi AA) · --accent 0.61 0.236 333 (judul besar + aksen) · --accent-2 0.57 0.170 333 · --pop 0.86 0.243 189 · --accent-bright 0.75 0.200 333 (teks kecil di atas bg gelap).
- Cek kontras: teks utama 0.94 vs bg 0.16 = jauh di atas 4.5:1; muted 0.78 vs bg 0.16 = di atas 4.5:1 (diperkirakan kuat, diverifikasi manual via rasio lightness + QA visual); aksen hanya untuk teks besar/aksen grafis, teks kecil pakai --accent-bright.

## Font (display/body/aksen, alasan, id Fontsource, variable atau bukan)
- Display Tai Heritage Pro (serif klasik kartu remi, kontras dengan bento modern) — BUKAN variable → gerak teks variable-axis DIGANTI split-huruf reveal + tukar weight 400↔700 saat scroll (disahkan v5 ATURAN 6: axis hanya kalau font memang variable).
- Body Alegreya Sans SC (small-caps, rasa kartu/karcis, terbaca di 390px).
- Aksen Fugaz One (stempel/judul stiker, dipakai hemat).
- Self-host: fonts/*.woff2 latin (6 file, 114 KB), font-display: swap, preload display 700.

## Ikon (gaya, sumber, daftar 12+ ikon, 3+ custom)
Gaya: outline tebal 3px sudut tajam, digambar sendiri inline (bukan unduhan Iconoir, menghindari dependensi). Daftar: kartu, hati, sekop, wajik, keriting, chip, tiket, kalender, pin lokasi, jam, cari, filter, salin, unduh, hapus, jeda, putar, panah. Custom domain: (1) kartu As Hati raksasa, (2) chip koin "TR", (3) stempel bundar "SAH/TERCETAK".

## Gerak (kategori A-F, narasi, MODE RINGAN)
- Narasi: scroll = bandar membagikan kartu makin jauh dari meja; marquee = suara meja; tilt = kartu diangkat tangan.
- A kamera: parallax 5 layer di hero (felt, kartu latar, judul, chip, stempel) + zoom-out di section penutup.
- B marquee: 2 band arah berlawanan (ikon suit + teks), kecepatan ikut velocity scroll + skew, tombol jeda.
- C teks: split huruf reveal (pengganti variable-axis, lihat Font).
- D input: tilt 3D kartu mengikuti pointer (nonaktif di sentuh/coarse).
- E reveal: panel detail dibuka dengan clip-path lingkaran dari kartu yang diklik.
- F MODE RINGAN: matikan parallax/tilt/marquee-animasi, kartu statis; toggle "Gerak: nyala/mati" + hormat prefers-reduced-motion.

## Storyboard hero moment
| Scroll | Yang terlihat | Kamera (zoom/pan) | Marquee | Teks | Interaksi |
| --- | --- | --- | --- | --- | --- |
| 0% | Tumpukan kartu + perintah PILIH KARTUMU | Kartu latar parallax layer 1-2 | Band atas jalan | Judul split-huruf masuk | Filter meja terlihat |
| 25% | Bento kartu konser, 1 kartu terpotong tepi | Parallax layer 3-4 | Band bawah berlawanan | Nama band reveal | Klik kartu → flip |
| 50% | Panel detail kartu terpilih | Zoom ringan ke panel | Kecepatan ikut scroll | Harga scramble→angka | Pilih kelas + jumlah, total odometer |
| 75% | Tiket tercetak + stempel SAH | Clip-path lingkaran membuka tiket | Jeda tersedia | Nomor tiket scramble | Salin WA / unduh JSON / deep-link |
| 100% | Riwayat + zoom-out meja penuh | Zoom-out akhir seluruh meja | Band melambat | "Meja ditutup" | Hapus riwayat / cetak lagi |

Pertunjukan utama: klik kartu pertama → kartu membalik (flip 3D) lalu panel detail membuka lewat lingkaran — terjadi dalam 5 detik pertama interaksi. 5 detik pertama: pengunjung melihat tumpukan kartu, perintah bandar, dan satu kartu terpotong yang mengundang scroll.

## Konten (15+ item nyata, easter egg)
16 konser FIKTIF (nama band/penyanyi karangan, BUKAN artis nyata; semua harga/tanggal = CONTOH berlabel): Orkes Daun Pisang (dangdut koplo, Jakarta), Senja di Blok M (indie folk, Jakarta), Keroncong Listrik (keroncong elektrik, Yogyakarta), Jazz di Atas Genteng (jazz, Bandung), Rock Pasar Minggu (rock, Jakarta), Pop Sepeda Tua (pop, Surabaya), Gambang Malam (gambang kromong modern, Jakarta), Ska Trotoar (ska, Yogyakarta), Blues Becak (blues, Medan), Indie Warung Kopi (indie, Bandung), Dangdut Pantura 77 (dangdut, Semarang), Folk Sawah (folk, Yogyakarta), Metal Panci (metal, Surabaya), Akustik Atap (akustik, Jakarta), Orkestra Angkot (orkestra pop, Bandung), Reggae Pelabuhan (reggae, Medan). Tiap item: kota, genre, tanggal Nov–Des 2026, venue generik (Gedung Kesenian Kota / Balai Warga / Lapangan Kota — CONTOH), harga 3 kelas CONTOH.
- Easter egg: ketik "kocok" di keyboard → seluruh grid dikocok ulang (urutan acak) + aria-live mengumumkan.

## Teknik visual orisinal (2+)
1. Grain feTurbulence overlay di seluruh halaman (constraint seed). 2. Kartu dengan clip-path potong sudut + stempel SVG berputar lambat. 3. Halftone dots di felt latar via radial-gradient berulang.

## Suara
Tidak — tanpa audio (bonus opsional tidak diambil; fokus ke gerak + fungsi).
