import { useEffect, useState } from "react";
import useQueryParams from "./useQueryParam";
import { getTestSearch } from "../services/test";
import { TestSearchViewDto } from "../types/Model/Test";
import { IPagination } from "./usePagination";

export const useSearchTest = (
  pagination: IPagination,
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>,
  onFinishFailed?: () => void
) => {
  const { getQueryParamWithSingleValue, getQueryParamWithMultipleValues } =
    useQueryParams();
  const [tests, setTests] = useState<TestSearchViewDto[]>();
  useEffect(() => {
    const fetchTests = async () => {
      const questionTypes = getQueryParamWithMultipleValues("questionType");
      const sort = getQueryParamWithSingleValue("sort");
      const title = getQueryParamWithSingleValue("title");
      let qs: string = `pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`;
      questionTypes?.forEach((type) => type && (qs += `&questionType=${type}`));
      if (sort) qs += `&questionSort=${sort}`;
      if (title) qs += `&title=${title}`;
      const res = await getTestSearch(qs);
      setTests(res.data);
      setPagination((prev) => ({ ...prev, totalRecords: res.totalRecords }));
      if ((!res.data || res.data.length === 0) && onFinishFailed)
        onFinishFailed();
    };
    fetchTests();
  }, [
    getQueryParamWithMultipleValues,
    getQueryParamWithSingleValue,
    pagination.pageNumber,
    pagination.pageSize,
    setPagination,
    onFinishFailed,
  ]);

  return { tests };
};
