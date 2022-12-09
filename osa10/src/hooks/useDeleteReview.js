import { useMutation } from "@apollo/client";
import { DELETEREVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, body] = useMutation(DELETEREVIEW);
  const deleteReview = async (id) => {
    const body = await mutate({
      variables: { id },
    });
    return body;
  };
  return [deleteReview, body];
};

export default useDeleteReview;
