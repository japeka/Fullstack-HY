export interface Diagnosis {
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
  Male = "male",
  Female = "female",
  Other = "other",
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes: Array<Diagnosis["code"]> | undefined;
  discharge?: Discharge;
  employerName?: string;
  sickLeave?: SickLeave;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating?: HealthCheckRating | undefined;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  healthCheckRating?: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  healthCheckRating?: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type newEntry = {
  date: string;
  type: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
  specialist: string;
  diagnosisCodes: Array<Diagnosis["code"]> | undefined;
  description: string;
  discharge: Discharge;
  employerName: string;
  sickLeave: SickLeave;
  healthCheckRating: HealthCheckRating;
};

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type CurrentPatient = Patient | null;
