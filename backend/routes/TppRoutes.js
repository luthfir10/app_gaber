import express from "express";
import { listAbsen, createTpp } from "../controllers/TppController.js";

const router = express.Router();

router.get("/tpp/:bulantpp&:tahuntpp&:bulanabsen&:tahunabsen", listAbsen);
router.post("/tpp", createTpp);

export default router;
