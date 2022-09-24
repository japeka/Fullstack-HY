import React from "react";

import { Typography } from "@material-ui/core";
import HealtRating from "../components/HealtRating";
import { Entry } from "../types";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

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

export default HealthCheck;
