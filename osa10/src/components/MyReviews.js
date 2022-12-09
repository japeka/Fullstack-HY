import React from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { FlatList, View, StyleSheet } from "react-native";
import MyReviewItem from "./MyReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, refetch } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: "cache-and-network",
  });

  let myReviews;
  if (!data) {
    myReviews = [];
  } else {
    myReviews = data.me.reviews.edges;
  }
  return (
    <FlatList
      data={myReviews}
      renderItem={({ item }) => (
        <MyReviewItem refetch={refetch} review={item} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.node.id}
    />
  );
};

export default MyReviews;
