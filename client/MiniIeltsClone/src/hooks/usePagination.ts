import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_RECORDS,
} from "../contants/pagination";
import { useLocation, useNavigate } from "react-router-dom";

interface IPagination {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}

export const usePagination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<IPagination>({
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
    totalRecords: DEFAULT_TOTAL_RECORDS,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const getPageNumber = () => {
      const param = searchParams.get("pageNumber");
      if (!param) return DEFAULT_PAGE_NUMBER;
      return parseInt(param);
    };
    const getPageSize = () => {
      const param = searchParams.get("pageSize");
      if (!param) return DEFAULT_PAGE_SIZE;
      return parseInt(param);
    };
    setPagination((prev) => ({
      ...prev,
      pageNumber: getPageNumber(),
      pageSize: getPageSize(),
    }));
  }, [location.search]);

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      const searchParams = new URLSearchParams(location.search);

      // Update the pageNumber parameter
      searchParams.set("pageNumber", pageNumber.toString());
      searchParams.set("pageSize", DEFAULT_PAGE_SIZE.toString());
      // Navigate to the new URL with the updated pageNumber
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    },
    [location.pathname, location.search, navigate]
  );

  return { pagination, setPagination, handleChangePage };
};
