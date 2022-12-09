import { useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGNUP);
  const createUser = async ({ username, password }) => {
    const body = await mutate({
      variables: { username, password },
    });
    return body;
  };
  return [createUser, result];
};

export default useSignUp;
