import { FunctionComponent, useEffect } from "react";
import TestPage from "./TestPage";
import useTest from "../../hooks/useTest";
import { useParams } from "react-router-dom";
import { getTestById } from "../../services/test";

interface UpdateTestPageProps {}

const UpdateTestPage: FunctionComponent<UpdateTestPageProps> = () => {
  const { setTest } = useTest();
  const { id } = useParams();
  useEffect(() => {
    const fetchTestById = async () => {
      if (!id) return;
      const res = await getTestById(id);
      setTest(res.data);
    };
    fetchTestById();
  }, [id, setTest]);
  return (
    <>
      <TestPage variant="update" />
    </>
  );
};

export default UpdateTestPage;
