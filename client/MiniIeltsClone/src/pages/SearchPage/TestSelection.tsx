import { Col, Empty, Flex, Pagination, Row } from "antd";
import { FunctionComponent, useState } from "react";
import TestCard from "../../components/TestCard";
import PaddingContainer from "../../components/PaddingContainer";
import { usePagination } from "../../hooks/usePagination";
import styles from "./SearchPage.module.scss";
import { useSearchTest } from "../../hooks/useSearchTest";
interface TestSelectionProps {}

const TestSelection: FunctionComponent<TestSelectionProps> = () => {
  const { pagination, handleChangePage, setPagination } = usePagination(8);
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const { tests } = useSearchTest(pagination, setPagination, () => {
    setEmpty(true);
  });

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
