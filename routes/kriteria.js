import { Router } from "express";
import {
  getAllKriteria,
  createKriteria,
  updateKriteria,
  deleteKriteria,
} from "../controllers/kriteriaController.js";

const router = Router();
router.get("/", getAllKriteria);
router.post("/", createKriteria);
router.put("/:id", updateKriteria);
router.delete("/:id", deleteKriteria);

export default router;
