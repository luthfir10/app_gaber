import express from "express";
import { listTppNip } from "../controllers/CekTppController.js";

const router = express.Router();

router.get("/cektpp/:nip&:bulantpp&:tahuntpp", listTppNip);

export default router;
