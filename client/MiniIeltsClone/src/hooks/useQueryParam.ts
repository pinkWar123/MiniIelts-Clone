import { useCallback } from "react";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const getQueryParamWithSingleValue = useCallback(
    (key: string): string | null => {
      const queryParams = new URLSearchParams(location.search);
      const paramValue = queryParams.get(key);
      if (paramValue === null) return null;
      return paramValue;
    },
    [location.search]
  );

  const getQueryParamWithMultipleValues = useCallback(
    (key: string): string[] | null => {
      const queryParams = new URLSearchParams(location.search);
      const paramValues = queryParams.getAll(key); // Use getAll to retrieve all values for the key

      // Return null if no values found, otherwise return the array of values
      return paramValues.length > 0 ? paramValues : null;
    },
    [location.search]
  );

  return { getQueryParamWithMultipleValues, getQueryParamWithSingleValue };
};

export default useQueryParams;
