import { Col, Row } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import TestCard from "../../components/TestCard";
import PaddingContainer from "../../components/PaddingContainer";
import { ITest } from "../../types/Model/Test";
import { getAllTests } from "../../services/test";

interface TestSelectionProps {}

const TestSelection: FunctionComponent<TestSelectionProps> = () => {
  const [tests, setTests] = useState<ITest[]>();
  useEffect(() => {
    const fetchTests = async () => {
      const res = await getAllTests();
      setTests(res.data);
      console.log(res.data);
    };
    fetchTests();
  }, []);
  return (
    <PaddingContainer padding={20}>
      <Row gutter={16}>
        {tests?.map((test, index) => (
          <Col xs={24} md={6} lg={6} xl={3} id={`test-${index}`}>
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
