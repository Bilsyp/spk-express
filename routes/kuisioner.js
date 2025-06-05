import { Router } from "express";
import {
  createAttitude,
  getAttitude,
  createKerjasama,
  getKerjasama,
} from "../controllers/kuisionerController.js";

const router = Router();

// Attitude
router.post("/attitude", createAttitude);
router.get("/attitude", getAttitude);

// Kerjasama
router.post("/kerjasama", createKerjasama);
router.get("/kerjasama", getKerjasama);

export default router;
