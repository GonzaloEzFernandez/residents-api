import express from "express";
import residentRoute from "./routes/residents.routes.js";
import "../config.js";
import { PORT } from "../config.js";

const app = express();

// middleware //
app.use(express.json());

app.use("/api/", residentRoute);
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoin not found" });
});

app.listen(PORT);
console.log(`Server on the port${PORT}`);
