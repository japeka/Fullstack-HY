export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NewPatientEntry = Omit<PatientEntry, "id">;

export interface PatientEntry {
  id: number | string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type newPatient = Omit<Patient, "ssn">;

export enum Gender {
  female = "female",
  male = "male",
  other = "other",
}
