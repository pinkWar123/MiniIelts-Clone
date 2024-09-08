import { Col, Pagination, Row } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import TestCard from "../../components/TestCard";
import PaddingContainer from "../../components/PaddingContainer";
import { TestSearchViewDto } from "../../types/Model/Test";
import { getTestSearch } from "../../services/test";
import useQueryParams from "../../hooks/useQueryParam";
import { usePagination } from "../../hooks/usePagination";

interface TestSelectionProps {}

const TestSelection: FunctionComponent<TestSelectionProps> = () => {
  const [tests, setTests] = useState<TestSearchViewDto[]>();
  const { pagination, handleChangePage, setPagination } = usePagination();
  const { getQueryParamWithMultipleValues, getQueryParamWithSingleValue } =
    useQueryParams();
  useEffect(() => {
    const fetchTests = async () => {
      const questionTypes = getQueryParamWithMultipleValues("questionType");
      const sort = getQueryParamWithSingleValue("sort");
      let qs: string = `pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`;
      questionTypes?.forEach((type) => type && (qs += `&questionType=${type}`));
      if (sort) qs += `&questionSort=${sort}`;
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
  return (
    <>
      <PaddingContainer padding={20}>
        <Row gutter={16}>
          {tests?.map((test, index) => (
            <Col xs={24} md={6} lg={6} id={`test-${index}`}>
              <TestCard
                title={test.title}
                viewCount={test.viewCount}
                picture={test.picture}
                id={test.id}
              />
            </Col>
          ))}
        </Row>
        <Pagination
          current={pagination.pageNumber}
          pageSize={pagination.pageSize}
          total={pagination.totalRecords}
          onChange={handleChangePage}
        />
      </PaddingContainer>
    </>
  );
};

export default TestSelection;
