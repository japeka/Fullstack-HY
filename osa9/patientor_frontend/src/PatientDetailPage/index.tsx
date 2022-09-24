import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { useStateValue } from "../state";
import Male from "../assets/male.svg";
import Female from "../assets/female.svg";
import { CurrentPatient, Entry, HealthCheckRating } from "../types";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import WorkIcon from "@mui/icons-material/Work";

const HealtRating: React.FC<{
  healthCheckRating: HealthCheckRating | undefined;
}> = ({ healthCheckRating }) =>
  healthCheckRating !== undefined && healthCheckRating === 0 ? (
    <FavoriteIcon />
  ) : healthCheckRating === 1 ? (
    <Brightness2Icon />
  ) : healthCheckRating === 2 ? (
    <BrightnessMediumIcon />
  ) : healthCheckRating === 3 ? (
    <PriorityHighIcon />
  ) : null;

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => (
  <div
    style={{
      border: "1px solid black",
      padding: "14px 30px 0 14px",
      marginBottom: "10px",
      borderRadius: "10px",
    }}
  >
    <Typography variant="body1">
      {entry.date} <MedicalInformationIcon />
    </Typography>
    <Typography variant="body1">{entry.description}</Typography>
    <HealtRating healthCheckRating={entry.healthCheckRating} />
    <Typography variant="body1">
      {entry.specialist ? `diagnose by ${entry.specialist}:` : null}
    </Typography>
  </div>
);
const OccupationalHealthcare: React.FC<{
  entry: Entry;
}> = ({ entry }) => (
  <div
    style={{
      border: "1px solid black",
      padding: "14px 30px 0 14px",
      marginBottom: "10px",
      borderRadius: "10px",
    }}
  >
    <Typography variant="body1">
      {entry.date} <WorkIcon /> {entry.employerName ? entry.employerName : null}
    </Typography>

    <Typography variant="body1">{entry.description}</Typography>
    <HealtRating healthCheckRating={entry.healthCheckRating} />
    <Typography variant="body1">
      {entry.specialist ? `diagnose by ${entry.specialist}:` : null}
    </Typography>
  </div>
);

const HealthCheck: React.FC<{ entry: Entry }> = ({ entry }) => (
  <div
    style={{
      border: "1px solid black",
      padding: "14px 30px 0 14px",
      marginBottom: "10px",
      borderRadius: "10px",
    }}
  >
    <Typography variant="body1">
      {entry.date} <MedicalInformationIcon />
    </Typography>
    <Typography variant="body1">{entry.description}</Typography>
    <HealtRating healthCheckRating={entry.healthCheckRating} />
    <Typography variant="body1">
      {entry.specialist ? `diagnose by ${entry.specialist}:` : null}
    </Typography>
  </div>
);

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
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();
  const [patient, setPatient] = React.useState<CurrentPatient>(null);

  React.useEffect(() => {
    if (!id) return;
    const allPatients = Object.values(patients);
    const _patient: CurrentPatient = allPatients.find(
      (p) => p.id === id
    ) as CurrentPatient;
    setPatient(_patient);
  }, [id]);

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
