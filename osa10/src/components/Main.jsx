import { Platform, StyleSheet, SafeAreaView } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import SingleRepository from "./RepositoryItem";
import MyReviews from "./MyReviews";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import CreateReview from "./CreateReview";

import AppBar from "./AppBar";
import theme from "./theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
    text: {
      fontFamily: Platform.select({
        android: "Roboto",
        ios: "Arial",
        default: "System",
      }),
    },
  },
});

const Main = () => {
  return (
    <SafeAreaView style={{ ...styles.container, ...styles.text }}>
      <AppBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/createreview" element={<CreateReview />} exact />
        <Route path="/myreviews" element={<MyReviews />} exact />
        <Route path="/repository/:id" element={<SingleRepository />} exact />
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" />} replace />
      </Routes>
    </SafeAreaView>
  );
};

export default Main;
