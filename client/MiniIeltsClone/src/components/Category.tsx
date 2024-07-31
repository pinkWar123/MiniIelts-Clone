import { FunctionComponent } from "react";
import PaddingContainer from "./PaddingContainer";
import { Flex } from "antd";

const categories = [
  {
    name: "All",
    value: "",
  },
  {
    name: "Recent Actual Tests",
    value: "recent-actual-tests",
  },
  {
    name: "General Training",
    value: "general-training",
  },
  {
    name: "Step-by-step Guide",
    value: "step-by-step-guide",
  },
  {
    name: "Economics & Business",
    value: "economics",
  },
  {
    name: "Education",
    value: "education",
  },
  {
    name: "Leisure & Entertainment",
    value: "leisure",
  },
  {
    name: "Nature & Environment",
    value: "nature",
  },
  {
    name: "News",
    value: "news",
  },
  {
    name: "PTE",
    value: "pte",
  },
  {
    name: "Science",
    value: "science",
  },
  {
    name: "Short Practice",
    value: "short-practice",
  },
  {
    name: "Sports & Health",
    value: "sports",
  },
  {
    name: "Technology",
    value: "technology",
  },
  {
    name: "Video",
    value: "video",
  },
];

interface CategoryProps {}

const Category: FunctionComponent<CategoryProps> = () => {
  return (
    <PaddingContainer>
      <Flex gap={"middle"} wrap>
        <strong>Category:</strong>
        {categories.map((category, index) => (
          <a key={index}>{category.name}</a>
        ))}
      </Flex>
    </PaddingContainer>
  );
};

export default Category;
