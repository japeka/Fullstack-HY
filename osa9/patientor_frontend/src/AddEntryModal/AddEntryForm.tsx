import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

//, SelectField, GenderOption
import { SelectField, TextField } from "./FormField";
import { Entry, HealthCheckRating } from "../types";

//Gender,
type diagnosis = {
  diagnosiscode: string;
};

type discharge = {
  dischargedate: string;
  dischargecriteria: string;
};

type sickLeave = {
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
};

export type EntryFormValues = sickLeave &
  discharge &
  diagnosis &
  Omit<Entry, "id" | "diagnosisCodes" | "discharge" | "sickLeave">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: Array<{ value: string; label: string }> = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        healthCheckRating: HealthCheckRating.LowRisk,
        date: "",
        specialist: "",
        description: "",
        diagnosiscode: "",
        dischargedate: "",
        dischargecriteria: "",
        employerName: "",
        sickLeaveStartDate: "",
        sickLeaveEndDate: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        } else {
          const date_regex = /^\d{4}-\d{2}-\d{2}$/;
          if (!date_regex.test(values.date)) {
            errors.date = "Field is not date";
          }
        }

        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        } else {
          if (
            !["0", "1", "2", "3"].includes(values.healthCheckRating.toString())
          ) {
            errors.healthCheckRating = "0,1,2,3 possible values";
          }
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (!values.description) {
          errors.description = requiredError;
        }

        if (!values.diagnosiscode) {
          errors.diagnosiscode = requiredError;
        }

        if (!values.dischargedate) {
          errors.dischargedate = requiredError;
        } else {
          const date_regex = /^\d{4}-\d{2}-\d{2}$/;
          if (!date_regex.test(values.dischargedate)) {
            errors.dischargedate = "Field is not date";
          }
        }

        if (!values.dischargecriteria) {
          errors.dischargecriteria = requiredError;
        }
        if (!values.sickLeaveStartDate) {
          errors.sickLeaveStartDate = requiredError;
        } else {
          const date_regex = /^\d{4}-\d{2}-\d{2}$/;
          if (!date_regex.test(values.sickLeaveStartDate)) {
            errors.sickLeaveStartDate = "Field is not date";
          }
        }

        if (!values.sickLeaveEndDate) {
          errors.sickLeaveEndDatee = requiredError;
        } else {
          const date_regex = /^\d{4}-\d{2}-\d{2}$/;
          if (!date_regex.test(values.sickLeaveEndDate)) {
            errors.sickLeaveEndDate = "Field is not date";
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="Health check rating"
              placeholder="Health Check Rating"
              name="healthCheckRating"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

            <Field
              label="Diagnosis code"
              placeholder="Diagnosis code"
              name="diagnosiscode"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="Discharge date"
              name="dischargedate"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="dischargecriteria"
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="SickLeave startDate"
              placeholder="SickLeave startDate"
              name="sickLeaveStartDate"
              component={TextField}
            />
            <Field
              label="SickLeave EndDate"
              placeholder="SickLeaveEndDate"
              name="sickLeaveEndDate"
              component={TextField}
            />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add entry
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
