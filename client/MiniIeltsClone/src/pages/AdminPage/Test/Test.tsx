import { FunctionComponent, useMemo } from "react";
import { TestSearchViewDto } from "../../../types/Model/Test";
import { Table, TableColumnsType, Tooltip } from "antd";
import CustomImage from "../../../components/CustomImage";
import { usePagination } from "../../../hooks/usePagination";
import SearchBox from "../../../components/Search";
import { useSearchTest } from "../../../hooks/useSearchTest";

interface TestProps {}

const Test: FunctionComponent<TestProps> = () => {
  const { pagination, setPagination, handleChangePage } = usePagination();
  const { tests } = useSearchTest(pagination, setPagination);

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
    ],
    []
  );

  return (
    <>
      <SearchBox />
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
    </>
  );
};

export default Test;
