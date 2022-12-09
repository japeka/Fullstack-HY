import React from "react";
import { useNavigate } from "react-router-dom";

import FormikTextInput from "./FormikTextInput";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Formik } from "formik";
import theme from "./theme";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

import * as yup from "yup";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: "1.3em",
  },
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Minimum length is 1")
    .max(30, "Max length is 30")
    .required("username is required"),
  password: yup
    .string()
    .min(1, "Minimum length is 1")
    .max(30, "Max length is 30")
    .required("password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords do not match")
    .required("password is required"),
});

export const SignUpContainer = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="username"
            testID="uname1"
            placeholder="Username"
          />
          <FormikTextInput
            name="password"
            testID="pword1"
            secureTextEntry
            placeholder="Password"
          />
          <FormikTextInput
            name="passwordConfirmation"
            testID="passwordConfirmation"
            secureTextEntry
            placeholder="Password confirmation"
          />
          <Pressable
            testID="fSubmit1"
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useSignUp();
  const [signIn] = useSignIn();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await createUser({ username, password });
      if (data) {
        const { data } = await signIn({ username, password });
        if (data) {
          navigate("/", { replace: true });
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return <SignUpContainer handleSubmit={handleSubmit} />;
};

export default SignUp;
