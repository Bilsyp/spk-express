import { Router } from "express";
import { hitungElectre } from "../controllers/electreController.js";

const router = Router();
router.post("/hitung", hitungElectre);

export default router;
