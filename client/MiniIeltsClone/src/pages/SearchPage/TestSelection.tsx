import { Col, Row } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import TestCard from "../../components/TestCard";
import PaddingContainer from "../../components/PaddingContainer";
import { ITest } from "../../types/Model/Test";
import { getAllTests } from "../../services/test";
import useQueryParams from "../../hooks/useQueryParam";
import { usePagination } from "../../hooks/usePagination";

interface TestSelectionProps {}

const TestSelection: FunctionComponent<TestSelectionProps> = () => {
  const [tests, setTests] = useState<ITest[]>();
  const { pagination } = usePagination();
  const { getQueryParamWithMultipleValues, getQueryParamWithSingleValue } =
    useQueryParams();
  useEffect(() => {
    const fetchTests = async () => {
      const questionTypes = getQueryParamWithMultipleValues("questionTypes");
      const sort = getQueryParamWithSingleValue("sort");
      const queries = {
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        sort,
        questionTypes,
      };
      const res = await getAllTests(queries);
      setTests(res.data);
      console.log(res.data);
    };
    fetchTests();
  }, []);
  return (
    <PaddingContainer padding={20}>
      <Row gutter={16}>
        {tests?.map((test, index) => (
          <Col xs={24} md={6} lg={6} id={`test-${index}`}>
            <TestCard
              title={test.title}
              viewCount={test.viewCount}
              category={test.category}
              picture={test.picture}
              id={test.id}
            />
          </Col>
        ))}
      </Row>
    </PaddingContainer>
  );
};

export default TestSelection;
