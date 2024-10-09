import { Col, Input, Pagination, Row, Select, Typography } from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { SeriesViewDto } from "../../../types/Responses/series";
import { usePagination } from "../../../hooks/usePagination";
import { getAllSeries } from "../../../services/series";
import { SeriesQuery } from "../../../types/Request/series";
import SeriesCard from "./SeriesCard";
import { SearchOutlined } from "@ant-design/icons";
import useQueryParams from "../../../hooks/useQueryParam";
import { useLocation, useNavigate } from "react-router-dom";

interface SeriesProps {}

const Series: FunctionComponent<SeriesProps> = () => {
  const [series, setSeries] = useState<SeriesViewDto[]>();
  const location = useLocation();
  const { getQueryParamWithSingleValue } = useQueryParams();
  const [search, setSearch] = useState<{
    title?: string;
    order?: string;
  }>();
  const navigate = useNavigate();
  const { pagination, setPagination, handleChangePage } = usePagination();
  const fetchSeries = useCallback(async () => {
    const query: SeriesQuery = {
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
    };
    const title = getQueryParamWithSingleValue("title");
    if (title) query.title = title;
    const order = getQueryParamWithSingleValue("order");
    if (order) query.sort = order;
    const res = await getAllSeries(query);
    setSeries(res.data);
    setPagination((prev) => ({ ...prev, totalRecords: res.totalRecords }));
  }, [
    pagination.pageNumber,
    pagination.pageSize,
    setPagination,
    getQueryParamWithSingleValue,
  ]);
  console.log(series);
  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);
  useEffect(() => {
    setSearch({
      title: getQueryParamWithSingleValue("title") ?? "",
      order: getQueryParamWithSingleValue("order") ?? "newest",
    });
  }, [getQueryParamWithSingleValue]);
  const handleSearch = () => {
    const title = search?.title;
    const order = search?.order;
    const params = new URLSearchParams(location.search);
    if (title) params.set("title", title);
    else params.delete("title");
    if (order) params.set("order", order);
    else params.delete("order");
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <Typography.Title>IELTS EXAM LIBRARY</Typography.Title>
      <Row gutter={16}>
        <Col span={20}>
          <Input
            value={search?.title}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Enter test name"
            suffix={
              <SearchOutlined
                style={{ cursor: "pointer" }}
                onClick={handleSearch}
              />
            }
            onPressEnter={handleSearch}
          />
        </Col>
        <Col span={4}>
          <Select
            style={{ width: "100%" }}
            value={search?.order}
            onChange={(value) =>
              setSearch((prev) => ({ ...prev, order: value }))
            }
            options={[
              {
                label: "Latest",
                value: "latest",
              },
              {
                label: "Newest",
                value: "newest",
              },
              {
                label: "High ranking",
                value: "high-ranking",
              },
            ]}
          />
        </Col>
      </Row>
      {series?.map((series, index) => (
        <SeriesCard
          title={series.title}
          tests={series.tests}
          image={series.image}
          key={index}
        />
      ))}

      <Pagination
        pageSize={pagination.pageSize}
        current={pagination.pageNumber}
        total={pagination.totalRecords}
        onChange={(config) => handleChangePage(config)}
      />
    </div>
  );
};

export default Series;
