import patients from "../data/patients";
import { v1 as uuid } from "uuid";

import { PatientEntry, NewPatientEntry, PublicPatient } from "../types";

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

export default {
  getPatients,
  getPatient,
  addPatient,
};
