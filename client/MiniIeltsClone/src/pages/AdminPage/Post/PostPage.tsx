import {
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePagination } from "../../../hooks/usePagination";
import { PostListingDto } from "../../../types/Responses/post";
import { formatTimestampToDateMonthYear } from "../../../helpers/time";
import {
  AuditOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { PostQuery } from "../../../types/Request/post";
import { deletePostById, getPosts } from "../../../services/post";
import { SKILL_COLORS, Skills } from "../../../contants/skills";
import parse from "html-react-parser";
import useQueryParams from "../../../hooks/useQueryParam";
interface PostPageProps {}

const PostPage: FunctionComponent<PostPageProps> = () => {
  const [posts, setPosts] = useState<PostListingDto[]>();
  const [form] = Form.useForm<PostQuery>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getQueryParamWithSingleValue } = useQueryParams();
  const { pagination, setPagination, handleChangePage } = usePagination();
  const fetchPosts = useCallback(async () => {
    const title = getQueryParamWithSingleValue("title");
    const sortBy = getQueryParamWithSingleValue("sortBy");
    const isDescending = getQueryParamWithSingleValue("isDescending");
    const query: PostQuery = {
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
      title: title ?? "",
      sortBy: sortBy ?? "",
      tag: Skills[getQueryParamWithSingleValue("tag") as keyof typeof Skills],
      isDescending: isDescending?.toLowerCase() === "true" ? true : false,
    };
    console.log(query);

    const res = await getPosts(query);
    setPosts(res.data);
    setPagination((prev) => ({ ...prev, totalRecords: res.totalRecords }));
  }, [
    pagination.pageNumber,
    pagination.pageSize,
    setPagination,
    getQueryParamWithSingleValue,
  ]);
  const handleDeletePost = async (id: number) => {
    await deletePostById(id);
    message.success("Delete post successfully");
    fetchPosts();
  };
  const columns: TableColumnsType<PostListingDto> = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "50%",
      render: (value) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }}>
          {parse(value)}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (value: string) => <>{formatTimestampToDateMonthYear(value)}</>,
    },
    {
      title: "Skill",
      dataIndex: "tag",
      key: "skill",
      render: (value: Skills) => (
        <Tag color={SKILL_COLORS[value ?? 0]}>
          {Skills[value as unknown as keyof typeof Skills]}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: PostListingDto) => (
        <Space>
          <Tooltip title="View post">
            <a href={`/post/${record.id}`} target="blank">
              <AuditOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Edit test">
            <a href={`/post/update/${record.id}`} target="blank">
              <EditOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Delete post">
            <Popconfirm
              title="Delete this post"
              description="Are you sure to delete this post?"
              placement="left"
              onConfirm={() => handleDeletePost(record.id)}
            >
              <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  const handleSearch = () => {
    const search = new URLSearchParams(location.search);
    const query = form.getFieldsValue();
    Object.entries(query).forEach(([key, value]) =>
      value === undefined || value === null
        ? search.delete(key)
        : search.set(key, value)
    );
    search.set("pageNumber", "1");
    search.set("pageSize", "10");
    navigate({
      pathname: location.pathname,
      search: search.toString(),
    });
  };

  useEffect(() => {
    form.setFieldValue("title", getQueryParamWithSingleValue("title") ?? "");
    form.setFieldValue("tag", getQueryParamWithSingleValue("tag"));
    form.setFieldValue("sortBy", getQueryParamWithSingleValue("sortBy") ?? "");
    form.setFieldValue(
      "isDescending",
      getQueryParamWithSingleValue("isDescending") ?? "false"
    );
  }, [form, getQueryParamWithSingleValue]);
  return (
    <>
      <Button>
        <a href="/post/create" target="blank">
          Click here to create a new post
        </a>
      </Button>
      <div>
        <Form
          form={form}
          initialValues={{
            isDescending: true,
            sortBy: "createdon",
            skill: Skills.LISTENING,
          }}
        >
          <Space>
            <Form.Item label="Title" name="title">
              <Input
                placeholder="Enter title of the post..."
                suffix={<SearchOutlined onClick={handleSearch} />}
                onPressEnter={handleSearch}
              />
            </Form.Item>
            <Form.Item label="Skill:" name={"tag"}>
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
                style={{ width: "130px" }}
              />
            </Form.Item>
            <Form.Item label="Sort by" name={"sortBy"}>
              <Select
                options={[
                  {
                    label: "Title",
                    value: "title",
                  },
                  {
                    label: "Created Date",
                    value: "createdon",
                  },
                  {
                    label: "Views",
                    value: "viewcount",
                  },
                ]}
                style={{ width: "130px" }}
              />
            </Form.Item>
            <Form.Item label="Is Descending?" name={"isDescending"}>
              <Select
                options={[
                  {
                    label: "Descending",
                    value: "true",
                  },
                  {
                    label: "Ascending",
                    value: "false",
                  },
                ]}
              />
            </Form.Item>
          </Space>
        </Form>
      </div>
      <Table
        columns={columns}
        dataSource={posts}
        pagination={{
          current: pagination.pageNumber,
          pageSize: pagination.pageSize,
          total: pagination.totalRecords,
        }}
        onChange={(page) => handleChangePage(page.current ?? 1)}
      />
    </>
  );
};

export default PostPage;
