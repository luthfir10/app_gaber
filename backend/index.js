import express from "express";
import cors from "cors";
import SittpRoutes from "./routes/SittpRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(SittpRoutes);

app.listen(5000, () => console.log("Server up and Running.."));
