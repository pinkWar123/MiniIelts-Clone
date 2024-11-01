import { FunctionComponent, useEffect, useState } from "react";
import { TestHistory } from "../../types/Responses/history";
import TestHistoryList from "./Dashboard/TestHistory/TestHistoryList";
import { Button, Form, Pagination, Select, Typography } from "antd";
import {
  callGetFullTestHistory,
  callGetListeningTestHistory,
} from "../../services/profile";
import { usePagination } from "../../hooks/usePagination";
import { IPagedResponse } from "../../types/Responses/response";
import { useLocation, useNavigate } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParam";

interface TestHistoryProps {}

const options = [
  {
    value: "reading",
    label: "Reading",
  },
  {
    value: "listening",
    label: "Listening",
  },
  {
    value: "writing",
    label: "Writing",
  },
];

const TestHistoryComponent: FunctionComponent<TestHistoryProps> = () => {
  const [histories, setHistories] = useState<TestHistory[]>();
  const { pagination, setPagination, handleChangePage } = usePagination();
  const [form] = Form.useForm<{ skill: string }>();
  const navigate = useNavigate();
  const { getQueryParamWithSingleValue } = useQueryParams();
  const location = useLocation();
  const getSkill = () => {
    const skill = getQueryParamWithSingleValue("skill");
    if (!skill || skill.toLocaleLowerCase().trim() === "listening")
      return "listening";
    else if (skill.toLocaleLowerCase().trim() === "reading") return "test";
    else return "full-test";
  };
  useEffect(() => {
    const fetchHistories = async () => {
      let res: IPagedResponse<TestHistory[]> = {
        data: [],
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        totalRecords: 0,
        totalPages: 0,
        succeeded: false,
      };
      const skill = getQueryParamWithSingleValue("skill");
      if (!skill || skill === "listening") {
        res = await callGetListeningTestHistory(
          pagination.pageNumber,
          pagination.pageSize
        );
      } else if (skill === "reading") {
        res = await callGetFullTestHistory(
          pagination.pageNumber,
          pagination.pageSize
        );
      }
      // if (id)
      //   res = await callGetTestHistoryByAdmin(
      //     id,
      //     pagination.pageNumber,
      //     pagination.pageSize
      //   );
      // else
      //   res = await callGetTestHistory(
      //     pagination.pageNumber,
      //     pagination.pageSize
      //   );
      console.log(res);
      setHistories(res.data);
      setPagination({
        pageNumber: res.pageNumber,
        pageSize: res.pageSize,
        totalRecords: res.totalRecords,
      });
    };
    fetchHistories();
  }, [
    pagination.pageNumber,
    pagination.pageSize,
    setPagination,
    getQueryParamWithSingleValue,
  ]);

  const handleSearch = () => {
    const url = new URLSearchParams(location.search);
    url.set("skill", form.getFieldValue("skill"));
    navigate({
      pathname: location.pathname,
      search: url.toString(),
    });
  };

  return (
    <>
      <Typography.Title>Exam history</Typography.Title>
      <Form initialValues={{ skill: getSkill() }} form={form} layout="inline">
        <Form.Item name={"skill"} label="Skill" style={{ width: "300px" }}>
          <Select options={options} />
        </Form.Item>
        <Form.Item>
          <Button
            onClick={handleSearch}
            shape="round"
            style={{
              backgroundColor: "#2f5376",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Apply
          </Button>
        </Form.Item>
      </Form>
      <TestHistoryList type={getSkill()} histories={histories ?? []} />
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
