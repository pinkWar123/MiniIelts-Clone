import { Button } from "antd";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PostPageProps {}

const PostPage: FunctionComponent<PostPageProps> = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate("/post/create")}>
        Click here to create a new post
      </Button>
    </>
  );
};

export default PostPage;
