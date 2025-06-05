import db from "../models/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { username, password, nama, role } = req.body;
  try {
    const [user] = await db.query("SELECT id FROM users WHERE username = ?", [
      username,
    ]);
    if (user.length)
      return res.status(400).json({ message: "Username sudah terpakai" });

    const hash = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, password, nama, role) VALUES (?, ?, ?, ?)",
      [username, hash, nama, role || "karyawan"]
    );
    res.json({ message: "Registrasi berhasil" });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const [user] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (!user.length)
      return res.status(401).json({ message: "Username salah" });

    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user[0].id, username: user[0].username, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user[0].id,
        username: user[0].username,
        nama: user[0].nama,
        role: user[0].role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}
