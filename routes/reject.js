import { Router } from "express";
import {
  createReject,
  getReject,
  updateReject,
  deleteReject,
} from "../controllers/rejectController.js";

const router = Router();

router.post("/", createReject); // input reject
router.get("/", getReject); // list/search reject
router.put("/:id", updateReject); // update reject
router.delete("/:id", deleteReject); // hapus reject

export default router;
