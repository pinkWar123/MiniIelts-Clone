import { FunctionComponent, useMemo } from "react";
import { TestSearchViewDto } from "../../../types/Model/Test";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import CustomImage from "../../../components/CustomImage";
import { usePagination } from "../../../hooks/usePagination";
import SearchBox from "../../../components/Search";
import { useSearchTest } from "../../../hooks/useSearchTest";
import { AuditOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteTestById } from "../../../services/test";
import FullTest from "../FullTest/FullTest";

interface TestProps {}

const Test: FunctionComponent<TestProps> = () => {
  const { pagination, setPagination, handleChangePage } = usePagination();
  const { tests, fetchTests } = useSearchTest(pagination, setPagination);
  const handleDeleteTest = async (id: number) => {
    await deleteTestById(id);
    await fetchTests();
    message.success({ content: "Delete test successfully" });
  };
  const columns: TableColumnsType<TestSearchViewDto> = useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (_, record: TestSearchViewDto) => (
          <Tooltip
            title={
              <CustomImage
                picture={record.picture ?? ""}
                style={{ width: "100px", height: "100px" }}
              />
            }
          >
            <a href={`../../update-test/${record.id}`}>{record.title}</a>
          </Tooltip>
        ),
      },
      { title: "View Count", dataIndex: "viewCount", key: "viewCount" },
      { title: "Created Date", dataIndex: "createdOn", key: "createdOn" },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space>
            <Tooltip title="View test">
              <a href={`../../test/${record.id}`} target="blank">
                <AuditOutlined />
              </a>
            </Tooltip>
            <Tooltip title="Edit test">
              <a href={`../../update-test/${record.id}`} target="blank">
                <EditOutlined />
              </a>
            </Tooltip>
            <Tooltip title="Delete test">
              <Popconfirm
                title="Delete this test"
                description="Are you sure to delete this test?"
                placement="left"
                onConfirm={() => handleDeleteTest(parseInt(record.id))}
              >
                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
              </Popconfirm>
            </Tooltip>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <>
      <SearchBox />
      <Space>
        <a href="../../create-test" target="blank">
          <Button style={{ margin: "20px 0" }}>Create new test</Button>
        </a>
      </Space>
      <Table
        columns={columns}
        dataSource={tests}
        pagination={{
          current: pagination.pageNumber,
          pageSize: pagination.pageSize,
          total: pagination.totalRecords,
        }}
        onChange={(config) => handleChangePage(config.current ?? 1)}
      />
      <FullTest />
    </>
  );
};

export default Test;
