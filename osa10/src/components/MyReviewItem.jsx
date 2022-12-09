import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import useDeleteReview from "../hooks/useDeleteReview";

import theme from "./theme";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 12,
    flexDirection: "row",
    backgroundColor: theme.colors.cardBackground,
  },
  ratingContainer: {
    paddingTop: 10,
  },
  rating: {
    border: `1px solid ${theme.colors.primary}`,
    color: theme.colors.primary,
    borderRadius: "50%",
    fontWeight: 700,
    padding: 10,
  },
  infoContainer: {
    flex: 11,
    paddingLeft: 10,
  },
  buttons: {
    marginTop: 4,
    flex: 10,
    flexDirection: "row",
  },
  buttonView: {
    flex: 5,
    padding: 20,
    backgroundColor: theme.colors.primary,
    border: "4px solid #fff",
    textAlign: "center",
  },
  buttonDelete: {
    flex: 5,
    textAlign: "center",
    padding: 20,
    backgroundColor: "#c84245",
    border: "4px solid #fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: "1.2em",
  },
  repositoryid: {
    fontWeight: 600,
    fontSize: "1em",
  },
  date: {
    fontWeight: 500,
    fontSize: "1em",
    color: "grey",
  },
  review: {
    fontSize: "1em",
    marginTop: 5,
  },
});
const convertDate = (date) => format(new Date(date), "dd.MM.yyyy");

const MyReviewItem = ({ review, refetch }) => {
  const { node } = review;
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();
  const onDeleteReview = (id) => {
    Alert.alert(
      "Delete review",
      "You want to delete the review?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "DELETE", onPress: () => deleteAfterConfirmation(id) },
      ],
      { cancelable: false }
    );
  };

  const deleteAfterConfirmation = async (id) => {
    await deleteReview(id);
    refetch();
  };

  return (
    node && (
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text>
            <Text style={styles.rating}>{node.rating}</Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.repositoryid}>{node.repository.id}</Text>
          <Text style={styles.date}>{convertDate(node.createdAt)}</Text>
          <Text style={styles.review}>{node.text}</Text>
          <View style={styles.buttons}>
            <Pressable
              onPress={() => navigate(`/repository/${node.repository.id}`)}
              style={styles.buttonView}
            >
              <Text style={styles.buttonText}>View repository</Text>
            </Pressable>
            <Pressable
              onPress={() => onDeleteReview(node.id)}
              style={styles.buttonDelete}
            >
              <Text style={styles.buttonText}>Delete review</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
  );
};

export default MyReviewItem;
