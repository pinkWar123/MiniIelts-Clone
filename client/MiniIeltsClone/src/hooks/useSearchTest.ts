import { useEffect, useState } from "react";
import { QuestionSortEnum } from "../contants/sort";
import { SearchQuery } from "../pages/SearchPage/search";
import useQueryParams from "./useQueryParam";
import {
  convertStringToQuestionTypeEnum,
  convertStringToSortEnum,
} from "../helpers/convertEnum";
import { getTestSearch } from "../services/test";
import { TestSearchViewDto } from "../types/Model/Test";
import { IPagination } from "./usePagination";

export const useSearchTest = (
  pagination: IPagination,
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>
) => {
  const { getQueryParamWithSingleValue, getQueryParamWithMultipleValues } =
    useQueryParams();
  const [tests, setTests] = useState<TestSearchViewDto[]>();

  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    questionType: [],
    sort: QuestionSortEnum.MostViewed,
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
  }, [getQueryParamWithSingleValue, getQueryParamWithMultipleValues]);

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
    };
    fetchTests();
  }, [
    getQueryParamWithMultipleValues,
    getQueryParamWithSingleValue,
    pagination.pageNumber,
    pagination.pageSize,
    setPagination,
  ]);

  return { tests };
};
