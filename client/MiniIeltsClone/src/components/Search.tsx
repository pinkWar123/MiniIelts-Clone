import { Button, Checkbox, Divider, Radio } from "antd";
import Search from "antd/es/input/Search";
import PaddingContainer from "./PaddingContainer";
import { QuestionTypeEnum } from "../contants/questionType";
import { QuestionSortEnum } from "../contants/sort";
import { SearchQuery } from "../pages/SearchPage/search";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParam";
import {
  convertStringToQuestionTypeEnum,
  convertStringToSortEnum,
} from "../helpers/convertEnum";

const questionTypes = [
  {
    name: "Matching Headings",
    value: QuestionTypeEnum.MatchingHeadings,
  },
  {
    name: "Matching Information",
    value: QuestionTypeEnum.MatchingInformation,
  },
  {
    name: "Multiple Choice",
    value: QuestionTypeEnum.MultipleChoice,
  },
  {
    name: "Plan, map, diagram labelling",
    value: QuestionTypeEnum.Labelling,
  },
  {
    name: "Sentence Completion",
    value: QuestionTypeEnum.SentenceCompletion,
  },
  {
    name: "Summary, form completion",
    value: QuestionTypeEnum.SummaryCompletion,
  },
  {
    name: "TRUE-FALSE-NOT GIVEN",
    value: QuestionTypeEnum.TFNG,
  },
  {
    name: "YES-NO-NOT GIVEN",
    value: QuestionTypeEnum.YNNG,
  },
];

const sortTypes = [
  {
    name: "Newest",
    value: QuestionSortEnum.Newest,
  },
  {
    name: "Oldest",
    value: QuestionSortEnum.Oldest,
  },
  {
    name: "Name A-Z",
    value: QuestionSortEnum.NameAZ,
  },
  {
    name: "Name Z-A",
    value: QuestionSortEnum.NameZA,
  },
  {
    name: "Most viewed",
    value: QuestionSortEnum.MostViewed,
  },
];

interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = () => {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    questionType: [],
    sort: QuestionSortEnum.MostViewed,
  });
  const { getQueryParamWithMultipleValues, getQueryParamWithSingleValue } =
    useQueryParams();
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
  const navigate = useNavigate();
  const handleSearch = () => {
    let qs: string = "";
    searchQuery.questionType?.forEach(
      (type) => type && (qs += `questionType=${type}&`)
    );
    qs = qs.slice(0, qs.length - 1);
    if (searchQuery.sort) qs += `&sort=${searchQuery.sort}`;
    if (searchQuery.title) {
      qs += `&title=${searchQuery.title}`;
    }
    navigate(`?${qs}`);
  };
  return (
    <PaddingContainer padding={20}>
      <Search
        placeholder="What are you looking for?"
        value={searchQuery.title}
        onChange={(e) =>
          setSearchQuery((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <p>Question type</p>
      <ul>
        <Checkbox.Group
          onChange={(value) =>
            setSearchQuery((prev) => ({ ...prev, questionType: value }))
          }
          value={searchQuery.questionType}
        >
          {questionTypes.map((questionType, index) => (
            <Checkbox value={questionType.value} key={`question-type-${index}`}>
              <span style={{ fontSize: "12px" }}>{questionType.name}</span>
            </Checkbox>
          ))}
        </Checkbox.Group>
      </ul>
      <Divider />
      <strong>Sort</strong>
      <Radio.Group
        value={searchQuery.sort}
        style={{ marginTop: "5px" }}
        onChange={(e) =>
          setSearchQuery((prev) => ({ ...prev, sort: e.target.value }))
        }
      >
        {sortTypes.map((sortType, index) => (
          <Radio key={index} value={sortType.value}>
            <span style={{ fontSize: "12px" }}>{sortType.name}</span>
          </Radio>
        ))}
      </Radio.Group>
      <Button
        style={{ width: "100%", marginTop: "10px" }}
        type="primary"
        onClick={handleSearch}
      >
        Search
      </Button>
      <Button
        style={{ width: "100%", marginTop: "10px", backgroundColor: "#d9534f" }}
        onClick={() => setSearchQuery({ questionType: [], sort: undefined })}
      >
        Reset
      </Button>
    </PaddingContainer>
  );
};

export default SearchBox;
