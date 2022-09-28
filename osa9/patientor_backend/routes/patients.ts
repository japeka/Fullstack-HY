import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";
import { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (_req, res) => {
  if (!_req.params.id) {
    return res.status(400).json({ error: "Id not included" });
  }
  const patient = patientService.getPatient(_req.params.id);
  if (!patient) {
    return res.status(400).json({ error: "Patient not included" });
  }
  return res.json(patient);
});

router.post("/:id/entries", (_req, res) => {
  if (!_req.params.id) {
    return res.status(400).json({ error: "Id not included" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newEntry = toNewEntry(_req.body);
  const addedEntry = patientService.addEntryToPatient(_req.params.id, newEntry);
  return res.status(200).json({ addedEntry });
});

router.post("/", (_req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(_req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(400).send(message);
  }
});

export default router;
