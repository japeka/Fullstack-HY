import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@material-ui/core";

import axios from "axios";

import { useStateValue } from "../state";
import Male from "../assets/male.svg";
import Female from "../assets/female.svg";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import { apiBaseUrl } from "../constants";

import { CurrentPatient, Entry } from "../types";
import AddEntryModal from "../AddEntryModal";
import HospitalEntry from "../components/HospitalEntry";
import OccupationalHealthcare from "../components/OccupationalHealthcare";
import HealthCheck from "../components/HealthCheck";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientDetailPage = (): JSX.Element => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<CurrentPatient>(null);

  React.useEffect(() => {
    if (!id) return;
    const allPatients = Object.values(patients);
    const _patient: CurrentPatient = allPatients.find(
      (p) => p.id === id
    ) as CurrentPatient;
    setPatient(_patient);
  }, [id]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const makeObject = (values: EntryFormValues, id?: string) => {
    const newEntryObject = {
      id,
      date: values.date,
      type: values.type,
      specialist: values.specialist,
      diagnosisCodes: [values.diagnosiscode],
      description: values.description,
      discharge: {
        date: values.dischargedate,
        criteria: values.dischargecriteria,
      },
      employerName: values.employerName,
      sickLeave: {
        startDate: values.sickLeaveStartDate,
        endDate: values.sickLeaveEndDate,
      },
      healthCheckRating: values.healthCheckRating,
    };
    return newEntryObject;
  };
  const submitNewPatient = async (values: EntryFormValues) => {
    try {
      const requestObject = makeObject(values, id);
      if (id && Object.keys(requestObject).length > 0) {
        const { data: addedEntry } = await axios.post<EntryFormValues>(
          `${apiBaseUrl}/patients/${id}/entries`,
          requestObject
        );
        dispatch({
          type: "ADD_PATIENT_ENTRY",
          payload: { entry: addedEntry, id: id },
        });
        closeModal();
      } else {
        console.error("id or request object does not exists");
        setError("id or request object does not exists");
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="app">
      <Box
        sx={{
          pt: 4,
        }}
      >
        {patient && Object.keys(patient).length > 0 && (
          <>
            <Typography variant="h6">
              {patient.name}{" "}
              <img
                width="20"
                src={patient.gender === "male" ? Male : Female}
              ></img>
            </Typography>
            <Typography variant="body1">ssn: {patient.ssn}</Typography>
            <Typography variant="body1">
              occupation: {patient.occupation}
            </Typography>
            <br />
            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewPatient}
              error={error}
              onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
              Add New Entry
            </Button>

            <Typography variant="h6">entries</Typography>
            <div>
              {patient.entries.map((entry: Entry) => (
                <EntryDetails key={entry.id} entry={entry} />
              ))}
            </div>
          </>
        )}
      </Box>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default PatientDetailPage;
