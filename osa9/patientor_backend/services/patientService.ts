import patientData from "../data/patients.json";

import { newPatient } from "../types";

const getPatients = (): newPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
};
