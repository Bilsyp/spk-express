import { Router } from "express";
import {
  createAbsensi,
  getAbsensi,
  updateAbsensi,
  deleteAbsensi,
} from "../controllers/absensiController.js";

const router = Router();

router.post("/", createAbsensi); // input absen
router.get("/", getAbsensi); // list/search absensi
router.put("/:id", updateAbsensi); // update absen
router.delete("/:id", deleteAbsensi); // hapus absen

export default router;
