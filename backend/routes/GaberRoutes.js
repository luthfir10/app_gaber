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

import { getNip } from "../controllers/AbsenController.js";

const router = express.Router();

router.get("/pegawais", getPegawai);
router.get("/pegawais/:nip", getPegawaiById);
router.post("/pegawais", createPegawai);
router.patch("/pegawais/:nip", updatePegawai);
router.delete("/pegawais/:nip", deletePegawai);

router.get("/kelurahan", getKelurahan);
router.get("/kelurahan/:kode", getKeluruhanById);
router.post("/kelurahan", createKelurahan);
router.patch("/kelurahan/:kode", updateKelurahan);
router.delete("/kelurahan/:kode", deleteKelurahan);

router.get("/jabatan", getJabatan);
router.get("/jabatan/:kode", getJabatanById);
router.post("/jabatan", createJabatan);
router.patch("/jabatan/:kode", updateJabatan);
router.delete("/jabatan/:kode", deleteJabatan);

router.get("/absen/:bulan&:tahun", getNip);

export default router;
