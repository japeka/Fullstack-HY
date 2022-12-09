import React from "react";
import { useNavigate } from "react-router-dom";

import FormikTextInput from "./FormikTextInput";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Formik } from "formik";
import theme from "./theme";
import useCreateReview from "../hooks/useCreateReview";

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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("repository owner is required"),
  repositoryName: yup.string().required("repository name is required"),
  rating: yup
    .number()
    .integer()
    .min(0, "Please give a number between 0 and 100")
    .max(100, "please give number between 0 and 100")
    .required("repository rating is required"),
  text: yup.string(),
});

export const CreateReviewContainer = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="ownerName"
            testID="fownerName"
            placeholder="repository owner name"
          />
          <FormikTextInput
            name="repositoryName"
            testID="frepositoryName"
            placeholder="repository name"
          />
          <FormikTextInput
            name="rating"
            testID="frating"
            placeholder="repository rating"
          />
          <FormikTextInput
            name="text"
            testID="ftext"
            multiline
            placeholder="repository review"
          />
          <Pressable
            testID="fSubmit"
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const handleSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    const { data } = await createReview({
      repositoryName,
      ownerName,
      rating: Number(rating),
      text,
    });
    if (data) {
      navigate(`/repository/${data.createReview.repositoryId}`, {
        replace: true,
      });
    }
  };
  return <CreateReviewContainer handleSubmit={handleSubmit} />;
};

export default CreateReview;
