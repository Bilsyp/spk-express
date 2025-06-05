import { Router } from "express";
import {
  getNilaiAlternatif,
  createNilaiAlternatif,
  updateNilaiAlternatif,
  deleteNilaiAlternatif,
} from "../controllers/nilaiAlternatifController.js";

const router = Router();

router.get("/", getNilaiAlternatif); // list/search
router.post("/", createNilaiAlternatif); // tambah nilai alternatif
router.put("/:id", updateNilaiAlternatif); // update
router.delete("/:id", deleteNilaiAlternatif); // hapus

export default router;
