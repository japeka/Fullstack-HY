import patientData from "../data/patients.json";
import { v1 as uuid } from "uuid";

import { PatientEntry, NewPatientEntry, PublicPatient } from "../types";

const getPatients = (): NewPatientEntry[] => {
  const pats = patientData.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    })
  );
  return pats;
};

const getPatient = (id: string): PublicPatient => {
  const patient = patientData.find((p) => p.id === id);
  return patient as PublicPatient;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatient,
  addPatient,
};
