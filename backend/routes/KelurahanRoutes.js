import express from "express";
import {
  getKelurahan,
  getKeluruhanById,
  createKelurahan,
  updateKelurahan,
  deleteKelurahan,
} from "../controllers/KelurahanController.js";

const router = express.Router();

router.get("/kelurahan", getKelurahan);
router.get("/kelurahan/:kode", getKeluruhanById);
router.post("/kelurahan", createKelurahan);
router.patch("/kelurahan/:kode", updateKelurahan);
router.delete("/kelurahan/:kode", deleteKelurahan);

export default router;
