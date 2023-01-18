import express from "express";
import { getNip, createAbsen } from "../controllers/AbsenController.js";

const router = express.Router();

router.get("/absen/:bulan&:tahun", getNip);
router.post("/absen", createAbsen);

export default router;
