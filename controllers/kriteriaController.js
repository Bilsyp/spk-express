import db from "../models/db.js";

// GET /api/kriteria
export async function getAllKriteria(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM kriteria");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST /api/kriteria
export async function createKriteria(req, res) {
  const { kode, nama, bobot } = req.body;
  try {
    await db.query(
      "INSERT INTO kriteria (kode, nama, bobot) VALUES (?, ?, ?)",
      [kode, nama, bobot]
    );
    res.json({ message: "Kriteria ditambah" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// PUT /api/kriteria/:id
export async function updateKriteria(req, res) {
  const { kode, nama, bobot } = req.body;
  try {
    await db.query(
      "UPDATE kriteria SET kode = ?, nama = ?, bobot = ? WHERE id = ?",
      [kode, nama, bobot, req.params.id]
    );
    res.json({ message: "Kriteria diupdate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE /api/kriteria/:id
export async function deleteKriteria(req, res) {
  try {
    const [result] = await db.query("DELETE FROM kriteria WHERE id = ?", [
      req.params.id,
    ]);
    if (!result.affectedRows)
      return res.status(404).json({ message: "Kriteria tidak ditemukan" });
    res.json({ message: "Kriteria dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
