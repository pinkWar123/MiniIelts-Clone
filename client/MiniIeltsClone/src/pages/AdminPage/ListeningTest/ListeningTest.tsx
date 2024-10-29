import { FunctionComponent, useCallback, useEffect, useState } from "react";
import useQueryParams from "../../../hooks/useQueryParam";
import { useLocation, useNavigate } from "react-router-dom";
import { usePagination } from "../../../hooks/usePagination";
import { FullTestQueryObject } from "../../../types/Request/fullTest";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import { getListeningTests } from "../../../services/listeningTest";
import { ListeningDropDownDto } from "../../../types/Responses/listeningTest";
import { formatTimestampToDateMonthYear } from "../../../helpers/time";
import {
  AuditOutlined,
  CustomerServiceOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

interface ListeningTestProps {}

const ListeningTest: FunctionComponent<ListeningTestProps> = () => {
  const [fullTests, setFullTests] = useState<ListeningDropDownDto[]>();
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
    const res = await getListeningTests(query);
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
  //   const handleDeleteTest = async (id: number) => {
  //     await deleteFullTestById(id);
  //     message.success("Delete test successfully");
  //     await fetchFullTests();
  //   };
  useEffect(() => {
    fetchFullTests();
  }, [fetchFullTests]);
  const columns: TableColumnsType<ListeningDropDownDto> = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Created Date",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (value: string) => <>{formatTimestampToDateMonthYear(value)}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: ListeningDropDownDto) => (
        <Space>
          <Tooltip title="View listening test">
            <a href={`../../listening-test/${record.id}`} target="blank">
              <AuditOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Edit listening test">
            <a href={`../../listening-test/edit/${record.id}`} target="blank">
              <EditOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Delete listening test">
            <Popconfirm
              title="Delete this listening test"
              description="Are you sure to delete this listening test?"
              placement="left"
              //   onConfirm={() => handleDeleteTest(record.id)}
            >
              <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

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
      <a href="/listening-test/create" target="blank">
        <Button
          icon={<CustomerServiceOutlined />}
          style={{ marginBottom: "20px" }}
        >
          Create new listening test
        </Button>
      </a>
      <Form
        style={{ marginBottom: "20px" }}
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
    </>
  );
};

export default ListeningTest;
