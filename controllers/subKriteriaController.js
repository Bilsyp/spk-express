import db from "../models/db.js";

// GET /api/sub_kriteria?kriteria_id=1
export async function getSubKriteria(req, res) {
  const { kriteria_id } = req.query;
  try {
    let [rows] = kriteria_id
      ? await db.query("SELECT * FROM sub_kriteria WHERE kriteria_id = ?", [
          kriteria_id,
        ])
      : await db.query("SELECT * FROM sub_kriteria");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST /api/sub_kriteria
export async function createSubKriteria(req, res) {
  const { kriteria_id, deskripsi, nilai } = req.body;
  try {
    await db.query(
      "INSERT INTO sub_kriteria (kriteria_id, deskripsi, nilai) VALUES (?, ?, ?)",
      [kriteria_id, deskripsi, nilai]
    );
    res.json({ message: "Sub kriteria ditambah" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// PUT /api/sub_kriteria/:id
export async function updateSubKriteria(req, res) {
  const { deskripsi, nilai } = req.body;
  try {
    await db.query(
      "UPDATE sub_kriteria SET deskripsi = ?, nilai = ? WHERE id = ?",
      [deskripsi, nilai, req.params.id]
    );
    res.json({ message: "Sub kriteria diupdate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE /api/sub_kriteria/:id
export async function deleteSubKriteria(req, res) {
  try {
    const [result] = await db.query("DELETE FROM sub_kriteria WHERE id = ?", [
      req.params.id,
    ]);
    if (!result.affectedRows)
      return res.status(404).json({ message: "Sub kriteria tidak ditemukan" });
    res.json({ message: "Sub kriteria dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
