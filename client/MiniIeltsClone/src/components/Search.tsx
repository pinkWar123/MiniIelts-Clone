import { Button, Checkbox, Divider, Radio } from "antd";
import Search from "antd/es/input/Search";
import PaddingContainer from "./PaddingContainer";

const questionTypes = [
  {
    name: "Matching Headings",
    value: 1,
  },
  {
    name: "Matching Information",
    value: 2,
  },
  {
    name: "Multiple Choice",
    value: 3,
  },
  {
    name: "Plan, map, diagram labelling",
    value: 4,
  },
  {
    name: "Sentence Completion",
    value: 5,
  },
  {
    name: "Summary, form completion",
    value: 6,
  },
  {
    name: "TRUE-FALSE-NOT GIVEN",
    value: 7,
  },
  {
    name: "YES-NO-NOT GIVEN",
    value: 8,
  },
];

const sortTypes = [
  {
    name: "Newest",
    value: 1,
  },
  {
    name: "Oldest",
    value: 2,
  },
  {
    name: "Name A-Z",
    value: 3,
  },
  {
    name: "Name Z-A",
    value: 4,
  },
  {
    name: "Most viewed",
    value: 5,
  },
];

export default function SearchBox() {
  return (
    <PaddingContainer padding={20}>
      <Search placeholder="What are you looking for?" />
      <p>Question type</p>
      <ul>
        {questionTypes.map((questionType, index) => (
          <li key={index} style={{ padding: "3px 0" }}>
            <Checkbox>
              <span style={{ fontSize: "12px" }}>{questionType.name}</span>
            </Checkbox>
          </li>
        ))}
      </ul>
      <Divider />
      <strong>Sort</strong>
      <Radio.Group style={{ marginTop: "5px" }}>
        {sortTypes.map((sortType, index) => (
          <Radio key={index} value={sortType.value}>
            <span style={{ fontSize: "12px" }}>{sortType.name}</span>
          </Radio>
        ))}
      </Radio.Group>
      <Button style={{ width: "100%", marginTop: "10px" }} type="primary">
        Search
      </Button>
      <Button
        style={{ width: "100%", marginTop: "10px", backgroundColor: "#d9534f" }}
      >
        Reset
      </Button>
    </PaddingContainer>
  );
}
