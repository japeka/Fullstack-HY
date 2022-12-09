import { useMutation } from "@apollo/client";
import { CREATEREVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATEREVIEW);
  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const body = await mutate({
      variables: { repositoryName, ownerName, rating, text },
    });
    return body;
  };
  return [createReview, result];
};

export default useCreateReview;
