import express from "express";
import {
  listAbsen,
  createTpp,
  getrepotrTpp,
} from "../controllers/TppController.js";

const router = express.Router();

router.get("/tpp/:bulantpp&:tahuntpp&:bulanabsen&:tahunabsen", listAbsen);
router.post("/tpp", createTpp);
router.get("/reporttpp/:bulan&:tahun", getrepotrTpp);

export default router;
