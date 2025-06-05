import db from "../models/db.js";

// GET /api/nilai_alternatif?periode=2024&user_id=2
export async function getNilaiAlternatif(req, res) {
  const { user_id, periode } = req.query;
  let q = `
    SELECT n.*, u.nama as nama_user, k.nama as nama_kriteria
    FROM nilai_alternatif n
    JOIN users u ON n.user_id = u.id
    JOIN kriteria k ON n.kriteria_id = k.id
    WHERE 1=1`;
  let params = [];
  if (user_id) {
    q += " AND n.user_id = ?";
    params.push(user_id);
  }
  if (periode) {
    q += " AND n.periode = ?";
    params.push(periode);
  }
  try {
    const [rows] = await db.query(q, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST /api/nilai_alternatif
export async function createNilaiAlternatif(req, res) {
  const { user_id, kriteria_id, nilai, periode } = req.body;
  try {
    // Cek sudah ada untuk user, kriteria, periode?
    const [exists] = await db.query(
      "SELECT id FROM nilai_alternatif WHERE user_id = ? AND kriteria_id = ? AND periode = ?",
      [user_id, kriteria_id, periode]
    );
    if (exists.length)
      return res
        .status(400)
        .json({ message: "Nilai alternatif sudah ada (pakai update)." });

    await db.query(
      "INSERT INTO nilai_alternatif (user_id, kriteria_id, nilai, periode) VALUES (?, ?, ?, ?)",
      [user_id, kriteria_id, nilai, periode]
    );
    res.json({ message: "Nilai alternatif ditambah." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// PUT /api/nilai_alternatif/:id
export async function updateNilaiAlternatif(req, res) {
  const { nilai } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE nilai_alternatif SET nilai = ? WHERE id = ?",
      [nilai, req.params.id]
    );
    res.json({
      message: "Update nilai alternatif berhasil",
      changedRows: result.changedRows,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE /api/nilai_alternatif/:id
export async function deleteNilaiAlternatif(req, res) {
  try {
    const [result] = await db.query(
      "DELETE FROM nilai_alternatif WHERE id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json({ message: "Nilai alternatif dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
