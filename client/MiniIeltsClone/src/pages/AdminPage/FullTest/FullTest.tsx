import { BookOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  TableColumnsType,
} from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import CreateFullTest from "./CreateFullTest";
import { FullTestViewDto } from "../../../types/Responses/fullTest";
import { FullTestQueryObject } from "../../../types/Request/fullTest";
import { getFullTests } from "../../../services/fullTest";
import { formatTimestampToDateMonthYear } from "../../../helpers/time";
import { usePagination } from "../../../hooks/usePagination";
import useQueryParams from "../../../hooks/useQueryParam";
import { useLocation, useNavigate } from "react-router-dom";

interface FullTestProps {}

const FullTest: FunctionComponent<FullTestProps> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fullTests, setFullTests] = useState<FullTestViewDto[]>();
  const { pagination, setPagination, handleChangePage } = usePagination(5);
  const navigate = useNavigate();
  const location = useLocation();
  const { getQueryParamWithSingleValue } = useQueryParams();
  const [form] = Form.useForm<{
    title: string;
    orderBy: "newest" | "popular";
  }>();
  const fetchFullTests = useCallback(async () => {
    const query: FullTestQueryObject = {
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
    };
    const title = getQueryParamWithSingleValue("title");
    const orderBy = getQueryParamWithSingleValue("orderBy");
    if (title) query.title = title;
    if (orderBy && (orderBy === "newest" || orderBy === "popular"))
      query.orderBy = orderBy;
    const res = await getFullTests(query);
    setFullTests(res.data);
    setPagination((prev) => ({
      ...prev,
      totalRecords: res.totalRecords,
    }));
  }, [
    setPagination,
    pagination.pageNumber,
    pagination.pageSize,
    getQueryParamWithSingleValue,
  ]);
  useEffect(() => {
    fetchFullTests();
  }, [fetchFullTests]);
  const columns: TableColumnsType<FullTestViewDto> = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Created Date",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (value: string) => <>{formatTimestampToDateMonthYear(value)}</>,
    },
  ];

  const openCreateFullTestModal = () => {
    setOpenModal(true);
  };

  const onCreateFinish = async () => {
    await fetchFullTests();
    closeCreateFullTestModal();
  };

  const closeCreateFullTestModal = () => setOpenModal(false);

  const handleSearch = async () => {
    const value = form.getFieldsValue();
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("pageNumber", "1");
    searchParams.set("pageSize", "5");
    const title = value.title;
    const orderBy = value.orderBy;
    if (title) searchParams.set("title", title);
    else searchParams.delete("title");
    if (orderBy) searchParams.set("orderBy", orderBy);
    else searchParams.delete("orderBy");
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <Button icon={<BookOutlined />} onClick={openCreateFullTestModal}>
        Create new full test
      </Button>
      <Form
        layout="inline"
        form={form}
        onFinish={handleSearch}
        initialValues={{
          title: getQueryParamWithSingleValue("title"),
          orderBy: getQueryParamWithSingleValue("orderBy"),
        }}
      >
        <Form.Item label="Title" name={"title"}>
          <Input placeholder="Title..." />
        </Form.Item>
        <Form.Item label="Order by" name={"orderBy"}>
          <Select
            style={{ width: "150px" }}
            options={[
              {
                label: "Newest",
                value: "newest",
              },
              {
                label: "Popular",
                value: "popular",
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={fullTests}
        columns={columns}
        pagination={{
          pageSize: pagination.pageSize,
          current: pagination.pageNumber,
          total: pagination.totalRecords,
        }}
        onChange={(pagination) => handleChangePage(pagination.current ?? 1)}
      />
      {openModal && (
        <Modal
          title="Create new full test"
          open
          footer={<></>}
          onClose={closeCreateFullTestModal}
          onCancel={closeCreateFullTestModal}
        >
          <CreateFullTest onFinish={onCreateFinish} />
        </Modal>
      )}
    </>
  );
};

export default FullTest;