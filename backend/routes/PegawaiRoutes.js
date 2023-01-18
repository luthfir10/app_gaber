import express from "express";
import {
  getPegawai,
  getPegawaiById,
  createPegawai,
  updatePegawai,
  deletePegawai,
} from "../controllers/PegawaiController.js";

const router = express.Router();

router.get("/pegawais", getPegawai);
router.get("/pegawais/:nip", getPegawaiById);
router.post("/pegawais", createPegawai);
router.patch("/pegawais/:nip", updatePegawai);
router.delete("/pegawais/:nip", deletePegawai);

export default router;
