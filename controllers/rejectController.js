import db from "../models/db.js";

// POST /api/reject
export async function createReject(req, res) {
  const { user_id, tanggal, jumlah, bukti_foto } = req.body;
  try {
    // Cek sudah input reject hari ini?
    const [exists] = await db.query(
      "SELECT id FROM reject WHERE user_id = ? AND tanggal = ?",
      [user_id, tanggal]
    );
    if (exists.length)
      return res.status(400).json({ message: "Sudah input reject hari ini." });

    await db.query(
      "INSERT INTO reject (user_id, tanggal, jumlah, bukti_foto) VALUES (?, ?, ?, ?)",
      [user_id, tanggal, jumlah, bukti_foto || null]
    );
    res.json({ message: "Input reject berhasil." });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// GET /api/reject (all, bisa filter)
export async function getReject(req, res) {
  const { user_id, tanggal } = req.query;
  let q =
    "SELECT r.*, u.username, u.nama FROM reject r JOIN users u ON r.user_id = u.id WHERE 1=1";
  let params = [];
  if (user_id) {
    q += " AND r.user_id = ?";
    params.push(user_id);
  }
  if (tanggal) {
    q += " AND r.tanggal = ?";
    params.push(tanggal);
  }
  q += " ORDER BY r.tanggal DESC";

  try {
    const [rows] = await db.query(q, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// PUT /api/reject/:id
export async function updateReject(req, res) {
  const { jumlah, bukti_foto } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE reject SET jumlah = ?, bukti_foto = ? WHERE id = ?",
      [jumlah, bukti_foto, req.params.id]
    );
    res.json({
      message: "Update reject berhasil",
      changedRows: result.changedRows,
    });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// DELETE /api/reject/:id
export async function deleteReject(req, res) {
  try {
    const [result] = await db.query("DELETE FROM reject WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Data reject tidak ditemukan" });
    res.json({ message: "Hapus reject berhasil" });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}
