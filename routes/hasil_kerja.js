import { Router } from "express";
import {
  createHasilKerja,
  getHasilKerja,
  updateHasilKerja,
  deleteHasilKerja,
} from "../controllers/hasilKerjaController.js";

const router = Router();

router.post("/", createHasilKerja); // input hasil kerja
router.get("/", getHasilKerja); // list/search hasil kerja
router.put("/:id", updateHasilKerja); // update hasil kerja
router.delete("/:id", deleteHasilKerja); // hapus hasil kerja

export default router;
