import { FunctionComponent, useEffect, useState } from "react";
import { TestHistory } from "../../types/Responses/history";
import TestHistoryList from "./Dashboard/TestHistory/TestHistoryList";
import { Pagination } from "antd";
import {
  callGetTestHistory,
  callGetTestHistoryByAdmin,
} from "../../services/profile";
import { usePagination } from "../../hooks/usePagination";
import { IPagedResponse } from "../../types/Responses/response";
import { useParams } from "react-router-dom";

interface TestHistoryProps {}

const TestHistoryComponent: FunctionComponent<TestHistoryProps> = () => {
  const [histories, setHistories] = useState<TestHistory[]>();
  const { pagination, setPagination, handleChangePage } = usePagination();
  const { id } = useParams();
  useEffect(() => {
    const fetchHistories = async () => {
      let res: IPagedResponse<TestHistory[]>;
      if (id)
        res = await callGetTestHistoryByAdmin(
          id,
          pagination.pageNumber,
          pagination.pageSize
        );
      else
        res = await callGetTestHistory(
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
