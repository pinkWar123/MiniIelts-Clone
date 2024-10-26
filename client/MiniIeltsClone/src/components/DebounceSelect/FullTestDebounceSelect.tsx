import { FunctionComponent, useCallback } from "react";
import DebounceSelect from "./DebounceSelect";
import { FullTestQueryObject } from "../../types/Request/fullTest";
import { getFullTests } from "../../services/fullTest";
import { FullTestNameDto } from "../../types/Responses/series";

interface FullTestDropDownValue {
  key: string;
  label: string;
  value: string;
}
interface FullTestDebounceSelectProps {
  onChange: (dtos: FullTestNameDto[]) => void;
  maxCount?: number;
}

const FullTestDebounceSelect: FunctionComponent<
  FullTestDebounceSelectProps
> = ({ onChange, maxCount }) => {
  const fetchOptions = useCallback(async (testName: string) => {
    const query: FullTestQueryObject = {
      pageNumber: 1,
      pageSize: 50,
      title: testName,
    };
    const res = await getFullTests(query);
    return res.data.map((test) => ({
      key: test.id.toString(),
      label: test.title,
      value: test.id.toString(),
    }));
  }, []);
  return (
    <>
      <DebounceSelect
        maxCount={maxCount}
        labelInValue
        mode="multiple"
        fetchOptions={fetchOptions}
        onChange={(items) => {
          const _items = items as unknown as FullTestDropDownValue[];
          onChange(
            _items.map((item) => ({
              title: item.label,
              id: parseInt(item.value),
            }))
          );
        }}
        style={{ width: "100%" }}
      />
    </>
  );
};

export default FullTestDebounceSelect;
