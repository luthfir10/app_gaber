import express from "express";
import cors from "cors";
import GaberRoutes from "./routes/GaberRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(GaberRoutes);

app.listen(5000, () => console.log("Server up and Running.."));
