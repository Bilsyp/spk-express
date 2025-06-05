import db from "../models/db.js";
import bcrypt from "bcryptjs";

// GET /api/users
export async function getAllUsers(req, res) {
  try {
    const [users] = await db.query(
      "SELECT id, username, nama, role, created_at FROM users"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// GET /api/users/:id
export async function getUserById(req, res) {
  try {
    const [users] = await db.query(
      "SELECT id, username, nama, role, created_at FROM users WHERE id = ?",
      [req.params.id]
    );
    if (!users.length)
      return res.status(404).json({ message: "User not found" });
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// PUT /api/users/:id
export async function updateUser(req, res) {
  const { nama, password, role } = req.body;
  try {
    let q = "UPDATE users SET";
    let fields = [];
    let params = [];
    if (nama) {
      fields.push(" nama = ? ");
      params.push(nama);
    }
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      fields.push(" password = ? ");
      params.push(hash);
    }
    if (role) {
      fields.push(" role = ? ");
      params.push(role);
    }
    if (!fields.length)
      return res.status(400).json({ message: "No update data" });
    q += fields.join(",") + " WHERE id = ?";
    params.push(req.params.id);
    const [result] = await db.query(q, params);
    res.json({ message: "User updated", changedRows: result.changedRows });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

// DELETE /api/users/:id
export async function deleteUser(req, res) {
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}
