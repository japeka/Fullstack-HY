import React, { useContext } from "react";
import { useApolloClient, useQuery } from "@apollo/client";

import { ME } from "../graphql/queries";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Link } from "react-router-dom";
import theme from "./theme";
import { useNavigate } from "react-router-dom";
import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textPrimary,
  },
  menuItem: {
    paddingTop: 20,
    paddingBottom: 20,
    textDecoration: "none",
    color: theme.appbar.color,
    fontSize: theme.appbar.fontsize,
    paddingLeft: 25,
  },
  menuButton: {
    paddingTop: 17,
    color: theme.appbar.color,
    fontSize: 22,
    paddingLeft: 20,
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const { data } = useQuery(ME);

  const me = data ? data.me : undefined;
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/", { replace: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link style={{ ...styles.menuItem, textDecoration: "none" }} to="/">
          Repositories
        </Link>
        {me ? (
          <>
            <Link
              style={{ ...styles.menuItem, textDecoration: "none" }}
              to="/createreview"
            >
              Create a review
            </Link>

            <Link
              style={{ ...styles.menuItem, textDecoration: "none" }}
              to="/myreviews"
            >
              My reviews
            </Link>

            <TouchableWithoutFeedback onPress={signOut}>
              <View>
                <Text style={styles.menuButton}>Sign out</Text>
              </View>
            </TouchableWithoutFeedback>
          </>
        ) : (
          <>
            <Link
              style={{ ...styles.menuItem, textDecoration: "none" }}
              to="/signin"
            >
              Sign in
            </Link>
            <Link
              style={{ ...styles.menuItem, textDecoration: "none" }}
              to="/signup"
            >
              Sign up
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
