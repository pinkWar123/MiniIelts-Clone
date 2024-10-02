import {
  Button,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import CreateSeriesModal from "./CreateSeriesModal";
import { SeriesViewDto } from "../../../types/Responses/series";
import { usePagination } from "../../../hooks/usePagination";
import useQueryParams from "../../../hooks/useQueryParam";
import { SeriesQuery } from "../../../types/Request/series";
import { getAllSeries } from "../../../services/series";
import { formatTimestampToDateMonthYear } from "../../../helpers/time";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface SeriesProps {}

const Series: FunctionComponent<SeriesProps> = () => {
  const [openCreateModal, toggledCreateModal] = useState<boolean>(false);
  const [series, setSeries] = useState<SeriesViewDto[]>();
  const { pagination, setPagination, handleChangePage } = usePagination();
  const { getQueryParamWithSingleValue } = useQueryParams();
  const fetchSeries = useCallback(async () => {
    const query: SeriesQuery = {
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
    };
    const title = getQueryParamWithSingleValue("title");
    if (title) query.title = title;
    const res = await getAllSeries(query);
    console.log(res);
    setSeries(res.data);
    setPagination((prev) => ({ ...prev, totalRecords: res.totalRecords }));
  }, [
    pagination.pageNumber,
    pagination.pageSize,
    getQueryParamWithSingleValue,
    setPagination,
  ]);
  const columns: TableColumnsType<SeriesViewDto> = [
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
      render: (_, record: SeriesViewDto) => (
        <Space>
          <Tooltip title="Edit series">
            <a href={`../../update-test/${record.id}`} target="blank">
              <EditOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Delete series">
            <Popconfirm
              title="Delete this series"
              description="Are you sure to delete this series?"
              placement="left"
              onConfirm={() => handleDeleteTest(record.id)}
            >
              <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);
  console.log(series);
  return (
    <>
      <Button onClick={() => toggledCreateModal(true)}>
        Create new series
      </Button>
      <Table
        dataSource={series}
        columns={columns}
        pagination={{
          current: pagination.pageNumber,
          ...pagination,
        }}
        onChange={(config) => handleChangePage(config.current ?? 1)}
      />
      {openCreateModal && (
        <CreateSeriesModal onClose={() => toggledCreateModal(false)} />
      )}
    </>
  );
};

export default Series;
