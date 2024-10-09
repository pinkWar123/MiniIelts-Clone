import { useContext } from "react";
import { PostContext, PostContextProps } from "../contexts/PostContext";

const usePost = (): PostContextProps => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a AnswersProvider");
  }
  return context;
};

export default usePost;
