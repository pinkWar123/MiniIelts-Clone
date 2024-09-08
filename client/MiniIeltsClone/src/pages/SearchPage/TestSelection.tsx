import { Col, Empty, Flex, Pagination, Row } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import TestCard from "../../components/TestCard";
import PaddingContainer from "../../components/PaddingContainer";
import { TestSearchViewDto } from "../../types/Model/Test";
import { getTestSearch } from "../../services/test";
import useQueryParams from "../../hooks/useQueryParam";
import { usePagination } from "../../hooks/usePagination";
import styles from "./SearchPage.module.scss";
interface TestSelectionProps {}

const TestSelection: FunctionComponent<TestSelectionProps> = () => {
  const [tests, setTests] = useState<TestSearchViewDto[]>();
  const { pagination, handleChangePage, setPagination } = usePagination();
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const { getQueryParamWithMultipleValues, getQueryParamWithSingleValue } =
    useQueryParams();
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
      if (!res.data || res.data.length === 0) setEmpty(true);
    };
    fetchTests();
  }, [
    getQueryParamWithMultipleValues,
    getQueryParamWithSingleValue,
    pagination.pageNumber,
    pagination.pageSize,
    setPagination,
  ]);
  if (isEmpty)
    return (
      <div className={styles["empty"]}>
        <Empty />
      </div>
    );
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
        <Flex justify="center">
          <Pagination
            current={pagination.pageNumber}
            pageSize={pagination.pageSize}
            total={pagination.totalRecords}
            onChange={handleChangePage}
            className={styles["pagination"]}
          />
        </Flex>
      </PaddingContainer>
    </>
  );
};

export default TestSelection;
