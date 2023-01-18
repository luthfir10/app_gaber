import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import JabatanRoutes from "./routes/JabatanRoutes.js";
import KelurahanRoutes from "./routes/KelurahanRoutes.js";
import PegawaiRoutes from "./routes/PegawaiRoutes.js";
import AbsenRoutes from "./routes/AbsenRoutes.js";
import TppRoutes from "./routes/TppRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import CekTppRoutes from "./routes/CekTppRoutes.js";
dotenv.config();

// port
const port = process.env.APP_PORT || 5000;
const app = express();
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://192.168.43.54:3000"],
  })
);
app.use(express.json());
app.use(JabatanRoutes);
app.use(KelurahanRoutes);
app.use(PegawaiRoutes);
app.use(AbsenRoutes);
app.use(TppRoutes);
app.use(UserRoutes);
app.use(AuthRoutes);
app.use(CekTppRoutes);

app.listen(port, () => console.log("Server up and Running..."));
