import { FunctionComponent, useEffect } from "react";
import PostEditor from "./PostEditor";
import usePost from "../../../hooks/usePost";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePostById } from "../../../services/post";
import { UpdatePostDto } from "../../../types/Request/post";
import { message } from "antd";

interface UpdatePostProps {}

const UpdatePost: FunctionComponent<UpdatePostProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    title,
    setTitle,
    setContent,
    setFileList,
    content,
    fileList,
    handleUpload,
  } = usePost();
  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const res = await getPostById(parseInt(id));
      const post = res.data;
      setTitle(post.title);
      setContent(post.content);
      if (post.image)
        setFileList([
          {
            uid: "-1",
            url: post.image,
            name: post.image,
          },
        ]);
    };
    fetchPost();
  }, [id, setContent, setFileList, setTitle]);
  const handleSubmit = async () => {
    // console.log(title);
    if (!id) return;
    let fileName: string = "";
    if (fileList.length > 0) {
      fileName = fileList[0].name ?? "";
      if (fileList[0].uid !== "-1") {
        const res = await handleUpload("post");
        if (res.data) fileName = res.data.fileNames[0];
      }
    }
    const dto: UpdatePostDto = {
      title,
      content,
      image: fileName,
    };
    console.log(dto);

    await updatePostById(parseInt(id), dto);
    message.success("Update post successfully");
    navigate(`/post/${id}`);
  };
  return (
    <>
      <PostEditor handleSubmit={handleSubmit} />
    </>
  );
};

export default UpdatePost;
