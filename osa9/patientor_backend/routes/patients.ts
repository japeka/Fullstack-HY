import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (_req, res) => {
  if (!_req.params.id) {
    res.status(400).json({ error: "Not found" });
  }
  const patient = patientService.getPatient(_req.params.id);
  res.json(patient);
});

router.post("/", (_req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newDiaryEntry = toNewPatientEntry(_req.body);
    const addedEntry = patientService.addPatient(newDiaryEntry);
    res.json(addedEntry);
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(400).send(message);
  }
});

export default router;
