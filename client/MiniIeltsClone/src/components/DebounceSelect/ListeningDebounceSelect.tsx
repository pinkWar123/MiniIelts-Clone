import { FunctionComponent, useCallback } from "react";
import DebounceSelect from "./DebounceSelect";
import { FullTestNameDto } from "../../types/Responses/series";
import { ListeningTestQuery } from "../../types/Request/listeningTest";
import { getListeningTests } from "../../services/listeningTest";

interface ListeningTestDropDownValue {
  key: string;
  label: string;
  value: string;
}
interface ListeningTestDebounceSelectProps {
  onChange: (dtos: FullTestNameDto[]) => void;
  maxCount?: number;
}

const ListeningTestDebounceSelect: FunctionComponent<
  ListeningTestDebounceSelectProps
> = ({ onChange, maxCount }) => {
  const fetchOptions = useCallback(async (testName: string) => {
    const query: ListeningTestQuery = {
      pageNumber: 1,
      pageSize: 50,
      title: testName,
    };
    const res = await getListeningTests(query);
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
          const _items = items as unknown as ListeningTestDropDownValue[];
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

export default ListeningTestDebounceSelect;
