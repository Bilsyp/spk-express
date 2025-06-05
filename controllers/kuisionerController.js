import db from "../models/db.js";

// --- Attitude ---

// POST /api/kuisioner/attitude
export async function createAttitude(req, res) {
  const { penilai_id, dinilai_id, skor, tahun } = req.body;
  try {
    // Cek sudah input untuk tahun ini?
    const [exists] = await db.query(
      "SELECT id FROM kuisioner_attitude WHERE penilai_id = ? AND dinilai_id = ? AND tahun = ?",
      [penilai_id, dinilai_id, tahun]
    );
    if (exists.length)
      return res
        .status(400)
        .json({ message: "Sudah mengisi attitude untuk tahun ini." });

    await db.query(
      "INSERT INTO kuisioner_attitude (penilai_id, dinilai_id, skor, tahun) VALUES (?, ?, ?, ?)",
      [penilai_id, dinilai_id, skor, tahun]
    );
    res.json({ message: "Input attitude sukses." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/kuisioner/attitude?dinilai_id=2&tahun=2024
export async function getAttitude(req, res) {
  const { penilai_id, dinilai_id, tahun } = req.query;
  let q = "SELECT * FROM kuisioner_attitude WHERE 1=1";
  let params = [];
  if (penilai_id) {
    q += " AND penilai_id = ?";
    params.push(penilai_id);
  }
  if (dinilai_id) {
    q += " AND dinilai_id = ?";
    params.push(dinilai_id);
  }
  if (tahun) {
    q += " AND tahun = ?";
    params.push(tahun);
  }

  try {
    const [rows] = await db.query(q, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// --- Kerjasama ---

// POST /api/kuisioner/kerjasama
export async function createKerjasama(req, res) {
  const { penilai_id, dinilai_id, skor, tahun } = req.body;
  try {
    // Cek sudah input untuk tahun ini?
    const [exists] = await db.query(
      "SELECT id FROM kuisioner_kerjasama WHERE penilai_id = ? AND dinilai_id = ? AND tahun = ?",
      [penilai_id, dinilai_id, tahun]
    );
    if (exists.length)
      return res
        .status(400)
        .json({ message: "Sudah mengisi kerjasama untuk tahun ini." });

    await db.query(
      "INSERT INTO kuisioner_kerjasama (penilai_id, dinilai_id, skor, tahun) VALUES (?, ?, ?, ?)",
      [penilai_id, dinilai_id, skor, tahun]
    );
    res.json({ message: "Input kerjasama sukses." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/kuisioner/kerjasama?dinilai_id=2&tahun=2024
export async function getKerjasama(req, res) {
  const { penilai_id, dinilai_id, tahun } = req.query;
  let q = "SELECT * FROM kuisioner_kerjasama WHERE 1=1";
  let params = [];
  if (penilai_id) {
    q += " AND penilai_id = ?";
    params.push(penilai_id);
  }
  if (dinilai_id) {
    q += " AND dinilai_id = ?";
    params.push(dinilai_id);
  }
  if (tahun) {
    q += " AND tahun = ?";
    params.push(tahun);
  }

  try {
    const [rows] = await db.query(q, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
