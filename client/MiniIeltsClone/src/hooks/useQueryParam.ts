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
      const paramValue = queryParams.get(key);
      if (paramValue === null) return null;

      return paramValue.split(",");
    },
    [location.search]
  );

  return { getQueryParamWithMultipleValues, getQueryParamWithSingleValue };
};

export default useQueryParams;
