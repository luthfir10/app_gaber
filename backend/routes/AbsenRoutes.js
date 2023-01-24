import express from "express";
import {
  getNip,
  createAbsen,
  getNipEdit,
  updateAbsen,
  deleteAbsen,
} from "../controllers/AbsenController.js";

const router = express.Router();

router.get("/absen/:bulan&:tahun", getNip);
router.post("/absen", createAbsen);
router.get("/absen/edit/:bulan&:tahun", getNipEdit);
router.patch("/absen", updateAbsen);
router.delete("/absen/:bulan&:tahun", deleteAbsen);

export default router;
