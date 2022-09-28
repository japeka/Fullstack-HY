import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_ENTRY";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload: any;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      const obj = {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
      return obj;
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT_ENTRY":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { id, entry } = action.payload;
      const patient = state.patients[id];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      patient.entries = [...patient.entries, entry.addedEntry];
      return {
        ...state,
        ...state.patients,
        [id]: patient,
      };

    default:
      return state;
  }
};
