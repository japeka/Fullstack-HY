import patients from "../data/patients";
import { v1 as uuid } from "uuid";

import {
  PatientEntry,
  NewPatientEntry,
  PublicPatient,
  NewEntry,
} from "../types";

const getPatients = (): NewPatientEntry[] => {
  const pats = patients.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries,
    })
  );
  return pats;
};

const getPatient = (id: string): PublicPatient => {
  const patient = patients.find((p) => p.id === id);
  return patient as PublicPatient;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (id: string, entry: NewEntry) => {
  const patient = patients.find((p) => p.id === id);
  const entryToAdd = {
    id: uuid(),
    ...entry,
  };
  const pat = patient?.entries.push(entryToAdd);
  patients.map((p) => {
    p.id === id ? pat : p;
  });
  return entryToAdd;
};

export default {
  getPatients,
  getPatient,
  addEntryToPatient,
  addPatient,
};
