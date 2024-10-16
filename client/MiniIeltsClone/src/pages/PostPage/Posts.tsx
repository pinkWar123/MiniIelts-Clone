import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { PostListingDto } from "../../types/Responses/post";
import { usePagination } from "../../hooks/usePagination";
import useQueryParams from "../../hooks/useQueryParam";
import { PostQuery } from "../../types/Request/post";
import { getPosts } from "../../services/post";
import {
  Card,
  Col,
  Flex,
  Form,
  Input,
  Layout,
  Pagination,
  Rate,
  Row,
  Select,
  Space,
} from "antd";
import CustomImage from "../../components/CustomImage";
import {
  CalendarOutlined,
  EyeOutlined,
  SearchOutlined,
  TagFilled,
} from "@ant-design/icons";
import { formatDate } from "../../helpers/time";
import RelatedTips from "./RelatedTips";
import { Skills } from "../../contants/skills";
import { useLocation, useNavigate } from "react-router-dom";

interface PostsProps {}

const Posts: FunctionComponent<PostsProps> = () => {
  const [posts, setPosts] = useState<PostListingDto[]>();
  const { pagination, setPagination, handleChangePage } = usePagination();
  const { getQueryParamWithSingleValue } = useQueryParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm<{ title?: string; tag?: Skills }>();

  const fetchPosts = useCallback(async () => {
    const query: PostQuery = {
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
    };
    const title = getQueryParamWithSingleValue("title");
    const tag = getQueryParamWithSingleValue("tag");
    if (title) query.title = title;
    if (tag) query.tag = Skills[tag as unknown as keyof typeof Skills];
    const res = await getPosts(query);
    if (res.data) {
      setPagination((prev) => ({ ...prev, totalRecords: res.totalRecords }));
      setPosts(res.data);
    }
  }, [
    pagination.pageNumber,
    pagination.pageSize,
    setPagination,
    getQueryParamWithSingleValue,
  ]);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    form.setFieldValue("title", getQueryParamWithSingleValue("title"));
    const tag = getQueryParamWithSingleValue("tag");

    if (tag)
      form.setFieldValue("tag", Skills[tag as unknown as keyof typeof Skills]);
  }, [getQueryParamWithSingleValue, form]);

  const handleSearch = () => {
    const params = new URLSearchParams(location.search);
    params.set("pageNumber", "1");
    params.set("pageSize", "10");
    const { title, tag } = form.getFieldsValue();
    if (title) params.set("title", title);
    else params.delete("title");
    if (tag)
      params.set(
        "tag",
        Skills[tag as unknown as keyof typeof Skills].toString()
      );
    else params.delete("tag");
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  return (
    <Layout>
      <Layout>
        <Row>
          <Col>
            <Row justify={"center"} gutter={16}>
              <Col
                sm={20}
                xs={20}
                md={16}
                lg={16}
                style={{ marginTop: "50px" }}
              >
                <Form form={form} layout="inline">
                  <Flex style={{ width: "100%" }}>
                    <Form.Item name={"title"} style={{ width: "80%" }}>
                      <Input
                        placeholder="Which tip are you looking for?"
                        suffix={<SearchOutlined onClick={handleSearch} />}
                        onPressEnter={handleSearch}
                      />
                    </Form.Item>
                    <Form.Item name={"tag"} style={{ flex: 1 }}>
                      <Select
                        options={[
                          ...Object.entries(Skills)
                            .filter(([key]) => isNaN(Number(key)))
                            .map(([key, value]) => ({
                              label: key,
                              value: Skills[value as keyof typeof Skills],
                            })),
                          {
                            label: "All skills",
                            value: null,
                          },
                        ]}
                      />
                    </Form.Item>
                  </Flex>
                </Form>
                {posts?.map((post) => (
                  <Card key={`post-${post.id}`} style={{ marginTop: "20px" }}>
                    <Flex>
                      <CustomImage
                        picture={post.image ?? ""}
                        style={{ width: "150px", height: "120px" }}
                      />
                      <div style={{ flex: 1, marginLeft: "20px" }}>
                        <div>
                          <a
                            href={`/post/${post.id}`}
                            style={{ fontSize: "18px" }}
                            target="_blank"
                          >
                            {post.title}
                          </a>
                        </div>
                        <Space>
                          {post.ratingResult.averageRating}
                          <Rate
                            style={{ fontSize: "12px" }}
                            value={post.ratingResult.averageRating}
                          />
                          <span>({post.ratingResult.ratingCount} votes)</span>
                        </Space>
                        <Flex
                          justify="space-between"
                          style={{ marginTop: "10px" }}
                        >
                          <Space
                            style={{ color: "#7E90A2", fontWeight: "bold" }}
                          >
                            <TagFilled />
                            {Skills[post.tag ?? 0]}Tip
                          </Space>
                          <Space>
                            <Flex gap={"small"}>
                              <EyeOutlined />
                              {post.viewCount}
                            </Flex>
                            <Space>
                              <CalendarOutlined />
                              {formatDate(post.createdOn)}
                            </Space>
                          </Space>
                        </Flex>
                      </div>
                    </Flex>
                  </Card>
                ))}
                <Flex justify="center" style={{ marginTop: "50px" }}>
                  <Pagination
                    pageSize={pagination.pageSize}
                    current={pagination.pageNumber}
                    total={pagination.totalRecords}
                    onChange={(page) => handleChangePage(page)}
                  />
                </Flex>
              </Col>
              <Col sm={20} xs={20} md={6} lg={6}>
                <RelatedTips />
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default Posts;
