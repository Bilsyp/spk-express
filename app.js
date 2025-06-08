import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import absensiRoutes from "./routes/absensi.js";
import kriteriaRoutes from "./routes/kriteria.js";
import subKriteriaRoutes from "./routes/sub_kriteria.js";
import hasilKerjaRoutes from "./routes/hasil_kerja.js";
import rejectRoutes from "./routes/reject.js";
import kuisionerRoutes from "./routes/kuisioner.js";
import electreRoutes from "./routes/electre.js";
import nilaiAlternatifRoutes from "./routes/nilai_alternatif.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/absensi", absensiRoutes);
app.use("/api/kriteria", kriteriaRoutes);
app.use("/api/sub_kriteria", subKriteriaRoutes);
app.use("/api/hasil-kerja", hasilKerjaRoutes);
app.use("/api/reject", rejectRoutes);
app.use("/api/kuisioner", kuisionerRoutes);
app.use("/api/electre", electreRoutes);
app.use("/api/nilai_alternatif", nilaiAlternatifRoutes);

// Middleware 404 untuk rute yang tidak ditemukan
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

// Middleware error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
