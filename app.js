/* TiketRemi — no-build, no dependency. Sections: DATA / STATE / RENDER / DETAIL / TIKET / GERAK */
(function () {
  "use strict";
  var KEY = "tiketremi-v1";
  var DATA = [
    { id: "daun-pisang", rank: "A", suit: "♥", band: "Orkes Daun Pisang", genre: "Dangdut", kota: "Jakarta", tanggal: "2026-11-07", venue: "Lapangan Kota (CONTOH)", harga: 75000 },
    { id: "senja-blokm", rank: "K", suit: "♠", band: "Senja di Blok M", genre: "Indie", kota: "Jakarta", tanggal: "2026-11-14", venue: "Gedung Kesenian Kota (CONTOH)", harga: 125000 },
    { id: "keroncong-listrik", rank: "Q", suit: "♦", band: "Keroncong Listrik", genre: "Folk", kota: "Yogyakarta", tanggal: "2026-11-15", venue: "Balai Warga (CONTOH)", harga: 90000 },
    { id: "jazz-genteng", rank: "J", suit: "♣", band: "Jazz di Atas Genteng", genre: "Jazz", kota: "Bandung", tanggal: "2026-11-21", venue: "Gedung Kesenian Kota (CONTOH)", harga: 150000 },
    { id: "rock-pasar-minggu", rank: "10", suit: "♥", band: "Rock Pasar Minggu", genre: "Rock", kota: "Jakarta", tanggal: "2026-11-22", venue: "Lapangan Kota (CONTOH)", harga: 175000 },
    { id: "pop-sepeda", rank: "9", suit: "♠", band: "Pop Sepeda Tua", genre: "Pop", kota: "Surabaya", tanggal: "2026-11-28", venue: "Balai Warga (CONTOH)", harga: 100000 },
    { id: "gambang-malam", rank: "8", suit: "♦", band: "Gambang Malam", genre: "Dangdut", kota: "Jakarta", tanggal: "2026-11-29", venue: "Gedung Kesenian Kota (CONTOH)", harga: 85000 },
    { id: "ska-trotoar", rank: "7", suit: "♣", band: "Ska Trotoar", genre: "Rock", kota: "Yogyakarta", tanggal: "2026-12-05", venue: "Lapangan Kota (CONTOH)", harga: 95000 },
    { id: "blues-becak", rank: "A", suit: "♠", band: "Blues Becak", genre: "Blues", kota: "Medan", tanggal: "2026-12-06", venue: "Gedung Kesenian Kota (CONTOH)", harga: 110000 },
    { id: "indie-warkop", rank: "K", suit: "♥", band: "Indie Warung Kopi", genre: "Indie", kota: "Bandung", tanggal: "2026-12-12", venue: "Balai Warga (CONTOH)", harga: 80000 },
    { id: "dangdut-pantura", rank: "Q", suit: "♣", band: "Dangdut Pantura 77", genre: "Dangdut", kota: "Semarang", tanggal: "2026-12-13", venue: "Lapangan Kota (CONTOH)", harga: 65000 },
    { id: "folk-sawah", rank: "J", suit: "♦", band: "Folk Sawah", genre: "Folk", kota: "Yogyakarta", tanggal: "2026-12-19", venue: "Balai Warga (CONTOH)", harga: 70000 },
    { id: "metal-panci", rank: "10", suit: "♣", band: "Metal Panci", genre: "Metal", kota: "Surabaya", tanggal: "2026-12-20", venue: "Lapangan Kota (CONTOH)", harga: 200000 },
    { id: "akustik-atap", rank: "9", suit: "♥", band: "Akustik Atap", genre: "Pop", kota: "Jakarta", tanggal: "2026-12-26", venue: "Gedung Kesenian Kota (CONTOH)", harga: 90000 },
    { id: "orkestra-angkot", rank: "8", suit: "♠", band: "Orkestra Angkot", genre: "Pop", kota: "Bandung", tanggal: "2026-12-27", venue: "Gedung Kesenian Kota (CONTOH)", harga: 135000 },
    { id: "reggae-pelabuhan", rank: "7", suit: "♦", band: "Reggae Pelabuhan", genre: "Reggae", kota: "Medan", tanggal: "2026-12-28", venue: "Lapangan Kota (CONTOH)", harga: 105000 }
  ];
  var MULT = { Reguler: 1, Festival: 1.5, VIP: 2.5 };
  var fmtRp = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
  var fmtTgl = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" });
  var $ = function (id) { return document.getElementById(id); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var motionOn = !reduced;

  function el(tag, text, cls) {
    var n = document.createElement(tag);
    if (text !== undefined && text !== null) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  }
  function hargaKelas(d, kelas) {
    return Math.round(d.harga * MULT[kelas] / 5000) * 5000;
  }
  function byId(id) { for (var i = 0; i < DATA.length; i++) if (DATA[i].id === id) return DATA[i]; return null; }

  /* ---------- STORAGE (validated, versioned) ---------- */
  function loadStore() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return { version: 1, tickets: [] };
      var s = JSON.parse(raw);
      if (!s || s.version !== 1 || !Array.isArray(s.tickets)) return { version: 1, tickets: [] };
      return s;
    } catch (e) { return { version: 1, tickets: [] }; }
  }
  function saveStore(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* storage penuh/diblokir: riwayat sesi saja */ } }
  var store = loadStore();

  /* ---------- STATE ---------- */
  var state = { kota: "", genre: "", cari: "", urut: "tanggal", kocok: false, selected: null, kelas: "Reguler", qty: 1 };

  function filtered() {
    var list = DATA.filter(function (d) {
      if (state.kota && d.kota !== state.kota) return false;
      if (state.genre && d.genre !== state.genre) return false;
      if (state.cari) {
        var q = state.cari.toLowerCase();
        if ((d.band + " " + d.kota + " " + d.genre).toLowerCase().indexOf(q) === -1) return false;
      }
      return true;
    });
    if (state.kocok) {
      for (var i = list.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = list[i]; list[i] = list[j]; list[j] = t; }
    } else if (state.urut === "murah") list.sort(function (a, b) { return a.harga - b.harga; });
    else if (state.urut === "mahal") list.sort(function (a, b) { return b.harga - a.harga; });
    else list.sort(function (a, b) { return a.tanggal < b.tanggal ? -1 : 1; });
    return list;
  }

  /* ---------- RENDER GRID ---------- */
  function renderGrid() {
    var grid = $("grid"); grid.innerHTML = "";
    var list = filtered();
    $("statusGrid").textContent = list.length + " kartu di meja" + (state.kocok ? " (sudah dikocok)" : "") + ". Semua harga CONTOH.";
    $("emptyGrid").hidden = list.length !== 0;
    list.forEach(function (d) {
      var card = el("article", null, "kartu");
      card.setAttribute("data-id", d.id);
      var rank = el("p", d.rank + d.suit, "rank"); card.appendChild(rank);
      var suit = el("p", d.suit, "suit"); suit.setAttribute("aria-hidden", "true"); card.appendChild(suit);
      var h = el("h3", d.band); card.appendChild(h);
      card.appendChild(el("p", d.genre + " · " + d.kota));
      card.appendChild(el("p", fmtTgl.format(new Date(d.tanggal + "T00:00:00")) + " · " + d.venue));
      card.appendChild(el("p", "mulai " + fmtRp.format(d.harga) + " (CONTOH)", "harga"));
      var b = el("button", "PILIH KARTU INI", "btn pilih");
      b.type = "button";
      b.addEventListener("click", function () { openDetail(d.id); });
      card.appendChild(b);
      grid.appendChild(card);
      bindTilt(card);
    });
    $("loadingGrid").hidden = true;
  }

  /* ---------- DETAIL ---------- */
  function openDetail(id) {
    var d = byId(id); if (!d) return;
    state.selected = d; state.qty = 1; state.kelas = "Reguler";
    document.querySelectorAll('input[name="kelas"]').forEach(function (r) { r.checked = r.value === "Reguler"; });
    var info = $("detailInfo"); info.innerHTML = "";
    info.appendChild(el("p", d.rank + d.suit + " — " + d.band, "rank"));
    var h = el("h3", d.band); info.appendChild(h);
    info.appendChild(el("p", d.genre + " · " + d.kota + " · " + fmtTgl.format(new Date(d.tanggal + "T00:00:00"))));
    info.appendChild(el("p", d.venue + " — semua harga di bawah ini CONTOH, bukan harga jual beneran."));
    $("hReguler").textContent = fmtRp.format(hargaKelas(d, "Reguler"));
    $("hFestival").textContent = fmtRp.format(hargaKelas(d, "Festival"));
    $("hVIP").textContent = fmtRp.format(hargaKelas(d, "VIP"));
    $("detailError").hidden = true;
    $("tiketOut").hidden = true;
    updateTotal();
    var sec = $("detail"); sec.hidden = false;
    sec.scrollIntoView({ behavior: motionOn ? "smooth" : "auto" });
    var judul = $("detail-judul"); judul.setAttribute("tabindex", "-1"); judul.focus();
  }
  var odRaf = null;
  function updateTotal() {
    if (!state.selected) return;
    var total = hargaKelas(state.selected, state.kelas) * state.qty;
    $("qty").textContent = String(state.qty);
    var out = $("totalHarga");
    if (odRaf) cancelAnimationFrame(odRaf);
    if (!motionOn) { out.textContent = fmtRp.format(total); out.dataset.v = String(total); return; }
    var from = parseInt((out.dataset.v || "0"), 10), start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 300, 1);
      out.textContent = fmtRp.format(Math.round(from + (total - from) * p));
      if (p < 1) odRaf = requestAnimationFrame(step); else { out.dataset.v = String(total); odRaf = null; }
    }
    odRaf = requestAnimationFrame(step);
  }

  /* ---------- TIKET ---------- */
  function cetak() {
    if (!state.selected) { var e = $("detailError"); e.textContent = "Kartu lu belum dipilih, Bos! Pilih kartu dulu di tumpukan atas."; e.hidden = false; return; }
    if (state.qty < 1 || state.qty > 8) { var e2 = $("detailError"); e2.textContent = "Jumlah tiket cuma boleh 1–8, Bos."; e2.hidden = false; return; }
    var nomor = "TR-2026-" + String(1000 + Math.floor(Math.random() * 9000));
    while (store.tickets.some(function (t) { return t.nomor === nomor; })) nomor = "TR-2026-" + String(1000 + Math.floor(Math.random() * 9000));
    var t = { nomor: nomor, band: state.selected.band, kota: state.selected.kota, genre: state.selected.genre, tanggal: state.selected.tanggal, kelas: state.kelas, qty: state.qty, total: hargaKelas(state.selected, state.kelas) * state.qty, dibuat: new Date().toISOString() };
    store.tickets.unshift(t); saveStore(store);
    var box = $("tiketOut"); box.innerHTML = "";
    box.appendChild(el("p", "TIKET TERCETAK — CAP SAH", "kecil"));
    box.appendChild(el("p", nomor, "nomor"));
    box.appendChild(el("p", t.qty + " × " + t.band + " (" + t.kelas + ") · " + t.kota + " · " + fmtTgl.format(new Date(t.tanggal + "T00:00:00"))));
    box.appendChild(el("p", "Total CONTOH: " + fmtRp.format(t.total) + " — bukan bukti bayar, cuma kartu contoh."));
    var aksi = el("div", null, "tiket-aksi");
    var b1 = el("button", "SALIN RINGKASAN WA", "btn"); b1.type = "button";
    b1.addEventListener("click", function () { salin("TiketRemi (CONTOH): " + t.band + " " + t.kota + " " + t.tanggal + " " + t.kelas + " x" + t.qty + " — " + t.nomor); });
    var b2 = el("button", "SALIN TAUTAN KARTU", "btn"); b2.type = "button";
    b2.addEventListener("click", function () { salin(location.origin + location.pathname + "?konser=" + encodeURIComponent(state.selected.id) + "&kelas=" + encodeURIComponent(state.kelas) + "&jml=" + state.qty); });
    aksi.appendChild(b1); aksi.appendChild(b2); box.appendChild(aksi);
    box.hidden = false;
    $("detailError").hidden = true;
    renderRiwayat();
  }
  function salin(teks) {
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = teks; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) { /* clipboard ditolak: pengguna salin manual */ }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(teks).catch(fallback);
    else fallback();
  }
  function renderRiwayat() {
    var list = $("riwayatList"); list.innerHTML = "";
    $("riwayatEmpty").hidden = store.tickets.length !== 0;
    store.tickets.forEach(function (t) {
      var li = document.createElement("li");
      li.appendChild(el("span", t.nomor + " — " + t.band + " (" + t.kelas + " ×" + t.qty + ")"));
      li.appendChild(el("span", fmtRp.format(t.total) + " (CONTOH)"));
      list.appendChild(li);
    });
  }
  function unduhJSON() {
    var blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "tiketremi-riwayat.json"; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  /* ---------- FILTER EVENTS ---------- */
  function terapkanFilter() {
    state.kota = $("fKota").value; state.genre = $("fGenre").value;
    state.cari = $("fCari").value.trim(); state.urut = $("fUrut").value;
    $("loadingGrid").hidden = false;
    setTimeout(renderGrid, 200);
  }
  ["fKota", "fGenre", "fUrut"].forEach(function (id) { $(id).addEventListener("change", terapkanFilter); });
  $("fCari").addEventListener("input", terapkanFilter);
  $("btnKocok").addEventListener("click", function () { state.kocok = true; terapkanFilter(); $("statusGrid").textContent = "Kartu dikocok, Bos!"; });
  $("btnReset").addEventListener("click", function () {
    state.kota = ""; state.genre = ""; state.cari = ""; state.kocok = false;
    $("fKota").value = ""; $("fGenre").value = ""; $("fCari").value = ""; terapkanFilter();
  });
  document.querySelectorAll('input[name="kelas"]').forEach(function (r) {
    r.addEventListener("change", function () { state.kelas = r.value; updateTotal(); });
  });
  $("qtyMinus").addEventListener("click", function () { if (state.qty > 1) { state.qty--; updateTotal(); } });
  $("qtyPlus").addEventListener("click", function () { if (state.qty < 8) { state.qty++; updateTotal(); } });
  $("btnCetak").addEventListener("click", cetak);
  $("btnTutupDetail").addEventListener("click", function () { $("detail").hidden = true; $("grid").scrollIntoView(); });
  $("btnUnduhJSON").addEventListener("click", unduhJSON);
  $("btnHapusRiwayat").addEventListener("click", function () { store = { version: 1, tickets: [] }; saveStore(store); renderRiwayat(); });

  /* ---------- TOGGLE GERAK & MARQUEE ---------- */
  $("motionToggle").addEventListener("click", function () {
    motionOn = !motionOn;
    document.body.classList.toggle("motion-off", !motionOn);
    this.textContent = "Gerak: " + (motionOn ? "nyala" : "mati");
    this.setAttribute("aria-pressed", String(motionOn));
  });
  if (reduced) { motionOn = false; document.body.classList.add("motion-off"); $("motionToggle").textContent = "Gerak: mati"; $("motionToggle").setAttribute("aria-pressed", "false"); }
  $("marqueeToggle").addEventListener("click", function () {
    var off = document.body.classList.toggle("marquee-off");
    this.textContent = "Marquee: " + (off ? "jeda" : "jalan");
    this.setAttribute("aria-pressed", String(!off));
  });

  /* ---------- MARQUEE CONTENT ---------- */
  function isiMarquee(idEl, items) {
    var track = $(idEl); var seq = el("span", items.join("  ·  ") + "  ·  ");
    var seq2 = el("span", items.join("  ·  ") + "  ·  "); seq2.setAttribute("aria-hidden", "true");
    track.appendChild(seq); track.appendChild(seq2);
  }
  isiMarquee("trackA", ["PILIH KARTUMU", "♥", "16 KONSER CONTOH", "♠", "CETAK TIKETMU", "♦", "JANGAN TRANSFER", "♣"]);
  isiMarquee("trackB", ["TIKETREMI", "♥", "MEJA BANDAR", "♠", "HARGA CONTOH", "♦", "KARTU AS", "♣"]);

  /* ---------- GERAK: split, parallax, tilt, zoom-out, velocity skew ---------- */
  var judul = $("judul");
  (function split() {
    var teks = judul.textContent; judul.textContent = "";
    teks.split("").forEach(function (ch, i) {
      var s = el("span", ch === " " ? "\u00A0" : ch);
      s.style.transitionDelay = (i * 35) + "ms"; judul.appendChild(s);
    });
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) judul.querySelectorAll("span").forEach(function (s) { s.classList.add("in"); }); }); }, { threshold: 0.3 });
    io.observe(judul);
  })();
  var lastY = 0, lastT = 0, vel = 0;
  function onScroll() {
    if (!motionOn) return;
    var y = window.scrollY, now = performance.now();
    vel = Math.min(Math.abs(y - lastY) / Math.max(now - lastT, 1) * 16, 12); lastY = y; lastT = now;
    var a = document.querySelector(".layer-card-a"), b = document.querySelector(".layer-card-b");
    if (a) a.style.transform = "translateY(" + (y * -0.12) + "px) rotate(12deg)";
    if (b) b.style.transform = "translateY(" + (y * -0.06) + "px) rotate(-10deg)";
    document.querySelectorAll(".marquee .track").forEach(function (t) { t.style.filter = "skewX(" + (vel > 3 ? (vel - 3) : 0) + "deg)"; });
    var pen = $("penutup"); if (pen) {
      var r = pen.getBoundingClientRect();
      var p = Math.max(0, Math.min(1, (window.innerHeight - r.top) / window.innerHeight));
      var inner = pen.querySelector(".penutup-inner");
      if (inner) inner.style.transform = "scale(" + (1.15 - p * 0.15) + ")";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  function bindTilt(card) {
    if (!window.matchMedia("(pointer: fine)").matches || !motionOn) return;
    card.addEventListener("pointermove", function (e) {
      if (!motionOn) return;
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = "perspective(700px) rotateX(" + (-y * 8) + "deg) rotateY(" + (x * 8) + "deg)";
    });
    card.addEventListener("pointerleave", function () { card.style.transform = ""; });
  }

  /* ---------- EASTER EGG: ketik "kocok" ---------- */
  var buf = "";
  document.addEventListener("keydown", function (e) {
    if (e.key && e.key.length === 1) {
      buf = (buf + e.key.toLowerCase()).slice(-5);
      if (buf === "kocok") { state.kocok = true; renderGrid(); $("statusGrid").textContent = "Easter egg: kartu dikocok ulang, Bos!"; }
    }
    if (e.key === "Escape" && !$("detail").hidden) $("detail").hidden = true;
  });

  /* ---------- DEEP-LINK ---------- */
  function deepLink() {
    var p = new URLSearchParams(location.search);
    var id = p.get("konser"), kelas = p.get("kelas"), jml = parseInt(p.get("jml") || "1", 10);
    if (id && byId(id)) {
      openDetail(id);
      if (MULT[kelas]) { state.kelas = kelas; document.querySelectorAll('input[name="kelas"]').forEach(function (r) { r.checked = r.value === kelas; }); }
      if (jml >= 1 && jml <= 8) state.qty = jml;
      updateTotal();
    }
  }

  renderGrid(); renderRiwayat(); deepLink();
})();
