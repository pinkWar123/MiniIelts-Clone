import { FunctionComponent, useCallback } from "react";
import DebounceSelect from "./DebounceSelect";

interface FullTestDebounceSelectProps {
  onChange: (ids: string[]) => void;
}

interface TestDropDownValue {
  key: string;
  label: string;
  value: string;
}

const FullTestDebounceSelect: FunctionComponent<
  FullTestDebounceSelectProps
> = ({ onChange }) => {
  const fetchOptions = useCallback(async (testName: string) => {
    const res = await getTestDropDown(testName);
    return res.data.map((test) => ({
      key: test.id,
      label: test.title,
      value: test.id,
    }));
  }, []);
  return (
    <>
      <DebounceSelect
        labelInValue
        maxCount={3}
        mode="multiple"
        fetchOptions={fetchOptions}
        onChange={(items) => {
          const _items = items as unknown as TestDropDownValue[];
          onChange(_items.map((item) => item.value));
        }}
        style={{ width: "100%" }}
      />
    </>
  );
};

export default FullTestDebounceSelect;
