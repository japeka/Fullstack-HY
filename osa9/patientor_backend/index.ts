import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
