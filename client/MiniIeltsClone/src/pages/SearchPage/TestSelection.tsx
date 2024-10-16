import { Col, Empty, Flex, Pagination, Row } from "antd";
import { FunctionComponent, useCallback, useState } from "react";
import TestCard from "../../components/TestCard";
import PaddingContainer from "../../components/PaddingContainer";
import { usePagination } from "../../hooks/usePagination";
import styles from "./SearchPage.module.scss";
import { useSearchTest } from "../../hooks/useSearchTest";
interface TestSelectionProps {}

const TestSelection: FunctionComponent<TestSelectionProps> = () => {
  const { pagination, handleChangePage, setPagination } = usePagination(8);
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const onFinishFailed = useCallback(() => {
    setEmpty(true);
  }, []);
  const { tests } = useSearchTest(pagination, setPagination, onFinishFailed);

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
            <Col xs={24} sm={12} md={12} lg={6} xxl={6} id={`test-${index}`}>
              <TestCard {...test} />
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
