const getSortBy = (sortBy) => {
  return sortBy === "ASC"
    ? {
        orderDirection: "ASC",
      }
    : sortBy === "DESC"
    ? {
        orderDirection: "DESC",
      }
    : sortBy === "CREATED_AT"
    ? {
        orderBy: "CREATED_AT",
      }
    : {};
};

export default getSortBy;
