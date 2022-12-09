import { useMutation, useApolloClient } from "@apollo/client";
import { useContext } from "react";

import { SIGNIN } from "../graphql/mutations";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGNIN);
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const signIn = async ({ username, password }) => {
    const body = await mutate({ variables: { username, password } });
    const { data } = body;

    if (data && data.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
    }
    return body;
  };

  return [signIn, result];
};

export default useSignIn;
