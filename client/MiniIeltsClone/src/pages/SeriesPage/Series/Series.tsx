import {
  Card,
  Col,
  Flex,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { SeriesViewDto } from "../../../types/Responses/series";
import { usePagination } from "../../../hooks/usePagination";
import { getAllSeries, getSeriesCollections } from "../../../services/series";
import { SeriesQuery } from "../../../types/Request/series";
import SeriesCard from "./SeriesCard";
import {
  AudioOutlined,
  BookOutlined,
  CustomerServiceOutlined,
  EditOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useQueryParams from "../../../hooks/useQueryParam";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Series.module.scss";
import CustomImage from "../../../components/CustomImage";
interface SeriesProps {}

const Series: FunctionComponent<SeriesProps> = () => {
  const [series, setSeries] = useState<SeriesViewDto[]>();
  const location = useLocation();
  const { getQueryParamWithSingleValue } = useQueryParams();
  const [search, setSearch] = useState<{
    title?: string;
    order?: string;
    skill?: string;
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
    const skill = getQueryParamWithSingleValue("skill");
    if (skill) query.skill = skill;
    if (skill?.toLowerCase() == "all") {
      const res = await getSeriesCollections(query);
      console.log(res);
      setSeries(
        res.data.map((series) => ({
          id: series.id,
          title: series.title,
          tests: series.collections.map((collection) => ({
            title: collection.title,
            id: collection.order,
          })),
          listeningTests: [],
          testCount: series.collections.length,
          image: series.image,
        }))
      );
      setPagination((prev) => ({ ...prev, totalRecords: res.totalRecords }));
      return;
    }
    const res = await getAllSeries(query);
    setSeries(res.data);
    setPagination((prev) => ({ ...prev, totalRecords: res.totalRecords }));
  }, [
    pagination.pageNumber,
    pagination.pageSize,
    setPagination,
    getQueryParamWithSingleValue,
  ]);
  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);
  useEffect(() => {
    setSearch({
      title: getQueryParamWithSingleValue("title") ?? "",
      order: getQueryParamWithSingleValue("order") ?? "newest",
      skill: getQueryParamWithSingleValue("skill") ?? "all",
    });
  }, [getQueryParamWithSingleValue]);
  const getTests = (series: SeriesViewDto) => {
    if (search?.skill === "listening") {
      return series.listeningTests;
    } else if (search?.skill === "reading" || search?.skill === "all") {
      return series.tests;
    }
    return [];
  };
  const handleSearch = () => {
    const title = search?.title;
    const order = search?.order;
    const skill = search?.skill;
    const params = new URLSearchParams(location.search);
    if (title) params.set("title", title);
    else params.delete("title");
    if (order) params.set("order", order);
    else params.delete("order");
    if (skill) params.set("skill", skill);
    else params.delete("skill");
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };
  const handleChangeSkill = (skill: string) => {
    const params = new URLSearchParams(location.search);
    params.set("skill", skill);
    navigate({ pathname: location.pathname, search: params.toString() });
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <Typography.Title>IELTS EXAM LIBRARY</Typography.Title>
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col flex={1}>
          <div
            className={`${styles["skill-wrapper"]} ${
              getQueryParamWithSingleValue("skill") === "all"
                ? styles["active"]
                : ""
            }`}
            id={styles["all"]}
            onClick={() => handleChangeSkill("all")}
          >
            <Space>
              <MenuOutlined />
              All skills
            </Space>
          </div>
        </Col>
        <Col flex={1}>
          <a
            className={`${styles["skill-wrapper"]} ${
              getQueryParamWithSingleValue("skill") === "listening"
                ? styles["active"]
                : ""
            }`}
            id={styles["listening"]}
            onClick={() => handleChangeSkill("listening")}
          >
            <Space>
              <CustomerServiceOutlined />
              Listening
            </Space>
          </a>
        </Col>
        <Col flex={1}>
          <a
            className={`${styles["skill-wrapper"]} ${
              getQueryParamWithSingleValue("skill") === "reading"
                ? styles["active"]
                : ""
            }`}
            id={styles["reading"]}
            onClick={() => handleChangeSkill("reading")}
          >
            <Space>
              <BookOutlined />
              Reading
            </Space>
          </a>
        </Col>
        <Col flex={1}>
          <a
            className={`${styles["skill-wrapper"]} ${
              getQueryParamWithSingleValue("skill") === "writing"
                ? styles["active"]
                : ""
            }`}
            id={styles["writing"]}
            onClick={() => handleChangeSkill("writing")}
          >
            <Space>
              <EditOutlined />
              Writing
            </Space>
          </a>
        </Col>
        <Col flex={1}>
          <a
            className={`${styles["skill-wrapper"]} ${
              getQueryParamWithSingleValue("skill") === "speaking"
                ? styles["active"]
                : ""
            }`}
            id={styles["speaking"]}
            onClick={() => handleChangeSkill("speaking")}
          >
            <Space>
              <AudioOutlined />
              Speaking
            </Space>
          </a>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={20}>
          <Input
            style={{ borderRadius: "30px" }}
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
            style={{ width: "100%", borderRadius: "30px" }}
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
      {search?.skill?.toLowerCase() !== "all" &&
        series?.map((series, index) => (
          <SeriesCard
            title={series.title}
            tests={getTests(series)}
            image={series.image}
            key={index}
            skill={getQueryParamWithSingleValue("skill") ?? ""}
          />
        ))}
      {search?.skill?.toLowerCase() === "all" && (
        <>
          {series?.map((series, index) => (
            <Card key={`series-${index}`}>
              <Flex justify="center">
                <CustomImage
                  style={{ width: "200px", height: "200px" }}
                  picture={series.image ?? ""}
                />
              </Flex>
              <Flex justify="center">
                <a href={`series/${series.id}/collection`}>
                  <Typography.Title level={3}>{series.title}</Typography.Title>
                </a>
              </Flex>
            </Card>
          ))}
        </>
      )}

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
