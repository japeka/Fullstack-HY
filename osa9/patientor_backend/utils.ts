import {
  NewPatientEntry,
  Gender,
  Entry,
  NewEntry,
  Diagnose,
  Discharge,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (obj: unknown, el: string): string => {
  if (!obj || !isString(obj)) {
    throw new Error(`Incorrect or missing ${el}`);
  }
  return obj;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing dob: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing weather: " + gender);
  }
  return gender;
};

const parseType = (
  type: unknown
): "HealthCheck" | "OccupationalHealthcare" | "Hospital" => {
  if (!type) {
    throw new Error("Incorrect type: " + type);
  }
  if (
    ["HealthCheck", "OccupationalHealthcare", "Hospital"].includes(
      type as "HealthCheck" | "OccupationalHealthcare" | "Hospital"
    )
  ) {
    return type as "HealthCheck" | "OccupationalHealthcare" | "Hospital";
  } else {
    throw new Error("Incorrect or missing type: " + type);
  }
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnose["code"]> => {
  if (!diagnosisCodes) {
    throw new Error("Incorrect diagnosisCodes");
  }
  if (Array.isArray(diagnosisCodes)) {
    return diagnosisCodes as Array<Diagnose["code"]>;
  } else {
    throw new Error("Incorrect diagnosisCodes");
  }
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge) {
    throw new Error("Incorrect discharge");
  }
  if (
    Object.keys(discharge).includes("date") &&
    Object.keys(discharge).includes("criteria")
  ) {
    return discharge as Discharge;
  } else {
    throw new Error("Incorrect discharge");
  }
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave) {
    throw new Error("Incorrect sickLeave");
  }
  if (
    Object.keys(sickLeave).includes("startDate") &&
    Object.keys(sickLeave).includes("endDate")
  ) {
    return sickLeave as SickLeave;
  } else {
    throw new Error("Incorrect sickLeave");
  }
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries) {
    throw new Error("Incorrect entries");
  }
  if (Array.isArray(entries)) {
    return entries as Entry[];
  } else {
    throw new Error("Incorrect entries");
  }
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (![0, 1, 2, 3].includes(Number(healthCheckRating))) {
    throw new Error("Incorrect healthCheckRating");
  }
  return Number(healthCheckRating);
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name, "name"),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, "ssn"),
    gender: parseGender(gender),
    occupation: parseString(occupation, "occupation"),
    entries: parseEntries(entries),
  };
  return newEntry;
};

type EntryFields = {
  date: unknown;
  type: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  description: unknown;
  discharge?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  healthCheckRating?: unknown;
};

export const toNewEntry = ({
  date,
  type,
  specialist,
  description,
  diagnosisCodes,
  discharge,
  employerName,
  sickLeave,
  healthCheckRating,
}: EntryFields): NewEntry => {
  const newEntry: NewEntry = {
    date: parseDate(date),
    type: parseType(type),
    specialist: parseString(specialist, "specialist"),
    description: parseString(description, "description"),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    discharge: parseDischarge(discharge),
    employerName: parseString(employerName, "employerName"),
    sickLeave: parseSickLeave(sickLeave),
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
  };
  return newEntry;
};

export default toNewPatientEntry;
