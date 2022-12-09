import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";
import getSortBy from "../utils/getSortBy";

const useRepositories = (sortBy, filterText) => {
  const variables = getSortBy(sortBy);
  const queryOptions = {
    ...variables,
    searchKeyword: filterText,
    first: 4,
  };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: queryOptions,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...queryOptions,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
