import {
  Button,
  Form,
  Input,
  message,
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
import { deleteSeriesById, getAllSeries } from "../../../services/series";
import { formatTimestampToDateMonthYear } from "../../../helpers/time";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UpdateSeriesModal from "./UpdateSeriesModal";

interface SeriesProps {}
interface ModalOpen {
  create: boolean;
  update: boolean;
}
const Series: FunctionComponent<SeriesProps> = () => {
  const [openModal, setOpenModal] = useState<ModalOpen>({
    create: false,
    update: false,
  });
  const [activeId, setActiveId] = useState<number>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
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
  const handleDeleteSeries = async (id: number) => {
    await deleteSeriesById(id);
    message.success("Delete series successfully");
    fetchSeries();
  };
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
            <a>
              <EditOutlined onClick={() => setActiveId(record.id)} />
            </a>
          </Tooltip>
          <Tooltip title="Delete series">
            <Popconfirm
              title="Delete this series"
              description="Are you sure to delete this series?"
              placement="left"
              onConfirm={() => handleDeleteSeries(record.id)}
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
  const handleSearch = () => {
    const searchParams = new URLSearchParams(location.search);
    const title = form.getFieldValue("title");
    searchParams.set("pageNumber", "1");
    searchParams.set("pageSize", "5");
    if (title) searchParams.set("title", title);
    else searchParams.delete("title");
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <>
      <Button
        onClick={() => setOpenModal((prev) => ({ ...prev, create: true }))}
      >
        Create new series
      </Button>
      <div>
        <Space>
          <Form
            form={form}
            initialValues={{ title: getQueryParamWithSingleValue("title") }}
          >
            <Form.Item name={"title"}>
              <Input
                style={{ width: "300px" }}
                placeholder="What series are you looking for?"
              />
            </Form.Item>
          </Form>
          <Form.Item>
            <Button icon={<SearchOutlined />} onClick={handleSearch}>
              Search
            </Button>
          </Form.Item>
        </Space>
      </div>
      <Table
        dataSource={series}
        columns={columns}
        pagination={{
          current: pagination.pageNumber,
          ...pagination,
        }}
        onChange={(config) => handleChangePage(config.current ?? 1)}
      />
      {openModal.create && (
        <CreateSeriesModal
          onClose={() => setOpenModal((prev) => ({ ...prev, create: false }))}
        />
      )}
      {activeId !== undefined && (
        <UpdateSeriesModal
          id={activeId}
          onClose={() => setActiveId(undefined)}
          fetchSeries={fetchSeries}
        />
      )}
    </>
  );
};

export default Series;
