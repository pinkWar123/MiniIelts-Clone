import { useCallback, useEffect, useState } from "react";
import useQueryParams from "./useQueryParam";
import { getTestSearch } from "../services/test";
import { TestSearchViewDto } from "../types/Model/Test";
import { IPagination } from "./usePagination";
import { SearchQuery } from "../pages/SearchPage/search";
import { QuestionSortEnum } from "../contants/sort";
import {
  convertStringToQuestionTypeEnum,
  convertStringToSortEnum,
} from "../helpers/convertEnum";

export const useSearchTest = (
  pagination: IPagination,
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>,
  onFinishFailed?: () => void
) => {
  const { getQueryParamWithSingleValue, getQueryParamWithMultipleValues } =
    useQueryParams();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    questionType: [],
  });
  useEffect(() => {
    const sort = getQueryParamWithSingleValue("sort");
    let sortParam: QuestionSortEnum | null = searchQuery?.sort ?? null;
    if (sort !== null) {
      sortParam = convertStringToSortEnum(sort);
    }
    const questionType = getQueryParamWithMultipleValues("questionType")?.map(
      (type) => convertStringToQuestionTypeEnum(type)
    );

    setSearchQuery((prev) => ({
      questionType: questionType
        ? questionType.filter((i) => i !== null)
        : prev.questionType,
      sort: sortParam || prev.sort,
      title: getQueryParamWithSingleValue("title") ?? "",
    }));
  }, [
    getQueryParamWithSingleValue,
    getQueryParamWithMultipleValues,
    searchQuery?.sort,
  ]);
  const [tests, setTests] = useState<TestSearchViewDto[]>();
  const fetchTests = useCallback(async () => {
    const questionTypes = searchQuery.questionType;
    const sort = searchQuery.sort;
    const title = searchQuery.title;
    let qs: string = `pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`;
    questionTypes?.forEach((type) => type && (qs += `&questionType=${type}`));
    if (sort) qs += `&questionSort=${sort}`;
    if (title) qs += `&title=${title}`;
    const res = await getTestSearch(qs);
    setTests(res.data);
    setPagination((prev) => ({ ...prev, totalRecords: res.totalRecords }));
    if ((!res.data || res.data.length === 0) && onFinishFailed)
      onFinishFailed();
  }, [
    searchQuery.questionType,
    searchQuery.title,
    searchQuery.sort,
    pagination.pageNumber,
    pagination.pageSize,
    setPagination,
    onFinishFailed,
  ]);
  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  return { tests, fetchTests };
};
