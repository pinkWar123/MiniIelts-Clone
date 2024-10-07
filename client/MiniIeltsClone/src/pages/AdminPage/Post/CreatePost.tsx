import { FunctionComponent } from "react";
import PostEditor from "./PostEditor";
import usePost from "../../../hooks/usePost";
import { CreatePostDto } from "../../../types/Request/post";
import { createNewPost } from "../../../services/post";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Skills } from "../../../contants/skills";

interface CreatePostProps {}

const CreatePost: FunctionComponent<CreatePostProps> = () => {
  const { post, fileList, handleUpload } = usePost();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const dto: CreatePostDto = {
      content: post?.content ?? "",
      image: post?.image,
      tag: post?.tag ?? Skills.LISTENING,
      title: post?.title ?? "",
    };
    if (fileList && fileList.length > 0) {
      const images = await handleUpload("post");
      const fileNames = images.data.fileNames;
      if (fileNames.length > 0) dto.image = fileNames[0];
    }
    const res = await createNewPost(dto);
    const newPostUrl = res.data;
    console.log(newPostUrl);

    message.success("Created post successfully");
    navigate(`/post/${newPostUrl}`);
  };
  return <PostEditor handleSubmit={handleSubmit} />;
};

export default CreatePost;
