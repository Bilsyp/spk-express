import db from "../models/db.js";

// POST /api/absensi
export async function createAbsensi(req, res) {
  const { user_id, tanggal, foto, keterangan, jam_masuk } = req.body;
  try {
    // Cek absen sudah ada?
    const [exists] = await db.query(
      "SELECT id FROM absensi WHERE user_id = ? AND tanggal = ?",
      [user_id, tanggal]
    );
    if (exists.length)
      return res.status(400).json({ message: "Sudah absen hari ini." });

    await db.query(
      "INSERT INTO absensi (user_id, tanggal, foto, keterangan, jam_masuk) VALUES (?, ?, ?, ?, ?)",
      [user_id, tanggal, foto || null, keterangan, jam_masuk || null]
    );
    res.json({ message: "Absen berhasil." });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// GET /api/absensi (all, bisa filter)
export async function getAbsensi(req, res) {
  const { user_id, tanggal } = req.query;
  let q =
    "SELECT a.*, u.username, u.nama FROM absensi a JOIN users u ON a.user_id = u.id WHERE 1=1";
  let params = [];
  if (user_id) {
    q += " AND a.user_id = ?";
    params.push(user_id);
  }
  if (tanggal) {
    q += " AND a.tanggal = ?";
    params.push(tanggal);
  }
  q += " ORDER BY a.tanggal DESC";

  try {
    const [rows] = await db.query(q, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// PUT /api/absensi/:id
export async function updateAbsensi(req, res) {
  const { foto, keterangan, jam_masuk } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE absensi SET foto = ?, keterangan = ?, jam_masuk = ? WHERE id = ?",
      [foto, keterangan, jam_masuk, req.params.id]
    );
    res.json({ message: "Update berhasil", changedRows: result.changedRows });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// DELETE /api/absensi/:id
export async function deleteAbsensi(req, res) {
  try {
    const [result] = await db.query("DELETE FROM absensi WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Data absen tidak ditemukan" });
    res.json({ message: "Hapus berhasil" });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}
