import express from "express";
import {
  getPegawai,
  getPegawaiById,
  createPegawai,
  updatePegawai,
  deletePegawai,
} from "../controllers/PegawaiController.js";

import {
  getKelurahan,
  getKeluruhanById,
  createKelurahan,
  updateKelurahan,
  deleteKelurahan,
} from "../controllers/KelurahanController.js";

import {
  getJabatan,
  getJabatanById,
  createJabatan,
  updateJabatan,
  deleteJabatan,
} from "../controllers/JabatanController.js";

const router = express.Router();

router.get("/pegawais", getPegawai);
router.get("/pegawais/:nip", getPegawaiById);
router.post("/pegawais", createPegawai);
router.patch("/pegawais/:nip", updatePegawai);
router.delete("/pegawais/:nip", deletePegawai);

router.get("/kelurahan", getKelurahan);
router.get("/kelurahan/:id", getKeluruhanById);
router.post("/kelurahan", createKelurahan);
router.patch("/kelurahan/:id", updateKelurahan);
router.delete("/kelurahan/:id", deleteKelurahan);

router.get("/jabatan", getJabatan);
router.get("/jabatan/:id", getJabatanById);
router.post("/jabatan", createJabatan);
router.patch("/jabatan/:id", updateJabatan);
router.delete("/jabatan/:id", deleteJabatan);

export default router;
