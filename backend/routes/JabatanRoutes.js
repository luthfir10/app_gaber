import express from "express";
import {
  getJabatan,
  getJabatanById,
  createJabatan,
  updateJabatan,
  deleteJabatan,
} from "../controllers/JabatanController.js";

const router = express.Router();

router.get("/jabatan", getJabatan);
router.get("/jabatan/:kode", getJabatanById);
router.post("/jabatan", createJabatan);
router.patch("/jabatan/:kode", updateJabatan);
router.delete("/jabatan/:kode", deleteJabatan);

export default router;
