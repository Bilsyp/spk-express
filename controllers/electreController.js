import db from "../models/db.js";

// Helper: Ambil nilai alternatif (1–5) tiap user, tiap kriteria, dalam periode tertentu
async function getAlternatif(periode = "2024") {
  // Ambil semua user dan semua kriteria
  const [users] = await db.query(
    'SELECT id, nama FROM users WHERE role = "karyawan"'
  );
  const [kriteria] = await db.query(
    "SELECT id, kode, nama, bobot FROM kriteria ORDER BY id"
  );
  // Ambil nilai mapping tiap user x kriteria x periode
  const [nilai] = await db.query(
    "SELECT user_id, kriteria_id, nilai FROM nilai_alternatif WHERE periode = ?",
    [periode]
  );
  // Susun matrix
  const matrix = users.map((user) => ({
    user_id: user.id,
    nama: user.nama,
    nilai: kriteria.map((kr) => {
      const n = nilai.find(
        (x) => x.user_id === user.id && x.kriteria_id === kr.id
      );
      return n ? n.nilai : 0; // 0 kalau belum ada
    }),
  }));
  return { users, kriteria, matrix };
}

// POST /api/electre/hitung
export async function hitungElectre(req, res) {
  const { periode } = req.body; // misal "2024"
  try {
    const { users, kriteria, matrix } = await getAlternatif(periode);

    // 1. Normalisasi matrix (nilai/akar jumlah kuadrat tiap kolom)
    const nKriteria = kriteria.length;
    const nUser = matrix.length;

    // hitung akar jumlah kuadrat tiap kolom (per kriteria)
    let akar = [];
    for (let j = 0; j < nKriteria; j++) {
      let sum = 0;
      for (let i = 0; i < nUser; i++) sum += Math.pow(matrix[i].nilai[j], 2);
      akar.push(Math.sqrt(sum));
    }

    // normalisasi matrix
    let norm = matrix.map((row) => ({
      ...row,
      norm: row.nilai.map((v, j) => (akar[j] ? v / akar[j] : 0)),
    }));

    // 2. Bobot
    const bobot = kriteria.map((k) => k.bobot);
    let v = norm.map((row) => ({
      ...row,
      v: row.norm.map((n, j) => n * bobot[j]),
    }));

    // 3. Hitung skor total (sederhana: sum semua v[j])
    let skor = v.map((row) => ({
      user_id: row.user_id,
      nama: row.nama,
      skor: row.v.reduce((a, b) => a + b, 0),
    }));

    // 4. Sorting skor terbesar ke kecil (ranking)
    skor.sort((a, b) => b.skor - a.skor);

    res.json({
      periode,
      ranking: skor.map((r, i) => ({ ...r, ranking: i + 1 })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
