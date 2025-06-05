import { Router } from "express";
import {
  getSubKriteria,
  createSubKriteria,
  updateSubKriteria,
  deleteSubKriteria,
} from "../controllers/subKriteriaController.js";

const router = Router();
router.get("/", getSubKriteria);
router.post("/", createSubKriteria);
router.put("/:id", updateSubKriteria);
router.delete("/:id", deleteSubKriteria);

export default router;
