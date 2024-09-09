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
  const getPageNumber = () => {
    const searchParams = new URLSearchParams(location.search);
    const param = searchParams.get("pageNumber");
    if (!param) return DEFAULT_PAGE_NUMBER;
    return parseInt(param);
  };
  const getPageSize = () => {
    const searchParams = new URLSearchParams(location.search);

    const param = searchParams.get("pageSize");
    if (!param) return DEFAULT_PAGE_SIZE;
    return parseInt(param);
  };
  const [pagination, setPagination] = useState<IPagination>({
    pageNumber: getPageNumber(),
    pageSize: getPageSize(),
    totalRecords: DEFAULT_TOTAL_RECORDS,
  });

  useEffect(() => {
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
      searchParams.set(
        "pageSize",
        pagination.pageSize.toString() || DEFAULT_PAGE_SIZE.toString()
      );
      // Navigate to the new URL with the updated pageNumber
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    },
    [location.pathname, location.search, navigate, pagination.pageSize]
  );

  return { pagination, setPagination, handleChangePage };
};
