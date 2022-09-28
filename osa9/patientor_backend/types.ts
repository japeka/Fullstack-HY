export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum Gender {
  female = "female",
  male = "male",
  other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
  discharge?: Discharge;
  type: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  healthCheckRating?: HealthCheckRating;
  employerName: string;
  sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
  healthCheckRating?: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export interface PatientEntry {
  id: number | string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatientEntry = Omit<PatientEntry, "id">;

export type newPatient = Omit<Patient, "ssn">;

export interface NewEntry {
  date: string;
  type: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
  discharge?: Discharge;
  employerName?: string;
  healthCheckRating: number;
  sickLeave?: SickLeave;
}
