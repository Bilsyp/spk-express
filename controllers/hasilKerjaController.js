import db from "../models/db.js";

// POST /api/hasil-kerja
export async function createHasilKerja(req, res) {
  const { user_id, tanggal, jumlah, bukti_foto } = req.body;
  try {
    // Cek sudah input hasil kerja hari ini?
    const [exists] = await db.query(
      "SELECT id FROM hasil_kerja WHERE user_id = ? AND tanggal = ?",
      [user_id, tanggal]
    );
    if (exists.length)
      return res
        .status(400)
        .json({ message: "Sudah input hasil kerja hari ini." });

    await db.query(
      "INSERT INTO hasil_kerja (user_id, tanggal, jumlah, bukti_foto) VALUES (?, ?, ?, ?)",
      [user_id, tanggal, jumlah, bukti_foto || null]
    );
    res.json({ message: "Input hasil kerja berhasil." });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// GET /api/hasil-kerja (all, bisa filter)
export async function getHasilKerja(req, res) {
  const { user_id, tanggal } = req.query;
  let q =
    "SELECT h.*, u.username, u.nama FROM hasil_kerja h JOIN users u ON h.user_id = u.id WHERE 1=1";
  let params = [];
  if (user_id) {
    q += " AND h.user_id = ?";
    params.push(user_id);
  }
  if (tanggal) {
    q += " AND h.tanggal = ?";
    params.push(tanggal);
  }
  q += " ORDER BY h.tanggal DESC";

  try {
    const [rows] = await db.query(q, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// PUT /api/hasil-kerja/:id
export async function updateHasilKerja(req, res) {
  const { jumlah, bukti_foto } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE hasil_kerja SET jumlah = ?, bukti_foto = ? WHERE id = ?",
      [jumlah, bukti_foto, req.params.id]
    );
    res.json({
      message: "Update hasil kerja berhasil",
      changedRows: result.changedRows,
    });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// DELETE /api/hasil-kerja/:id
export async function deleteHasilKerja(req, res) {
  try {
    const [result] = await db.query("DELETE FROM hasil_kerja WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: "Data hasil kerja tidak ditemukan" });
    res.json({ message: "Hapus hasil kerja berhasil" });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}
