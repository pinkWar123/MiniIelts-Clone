import { FunctionComponent, useEffect, useState } from "react";
import { TestHistory } from "../../types/Responses/history";
import TestHistoryList from "./Dashboard/TestHistory/TestHistoryList";
import { Pagination } from "antd";
import { callGetTestHistory } from "../../services/profile";
import { usePagination } from "../../hooks/usePagination";

interface TestHistoryProps {}

const TestHistoryComponent: FunctionComponent<TestHistoryProps> = () => {
  const [histories, setHistories] = useState<TestHistory[]>();
  const { pagination, setPagination, handleChangePage } = usePagination();
  useEffect(() => {
    const fetchHistories = async () => {
      const res = await callGetTestHistory(
        pagination.pageNumber,
        pagination.pageSize
      );
      console.log(res);
      setHistories(res.data);
      setPagination({
        pageNumber: res.pageNumber,
        pageSize: res.pageSize,
        totalRecords: res.totalRecords,
      });
    };
    fetchHistories();
  }, [pagination.pageNumber, pagination.pageSize, setPagination]);

  return (
    <>
      <TestHistoryList histories={histories ?? []} />
      <Pagination
        current={pagination.pageNumber}
        pageSize={pagination.pageSize}
        total={pagination.totalRecords}
        onChange={(page) => handleChangePage(page)}
      />
    </>
  );
};

export default TestHistoryComponent;
