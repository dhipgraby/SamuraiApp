import React from "react";
import { handleCheckbox } from "@/lib/form.utils";

interface Props {
  data: { value: string; name: string }[];
  groupName: string;
  multiple?: boolean;
  form: any;
}

const CheckBoxes: React.FC<Props> = ({ data, groupName, multiple = false, form }) => {
  const currentValue = form.getValues(groupName);

  const isChecked = (itemValue: string) => {
    if (!currentValue) return false;
    if (multiple) return currentValue.includes(itemValue);
    return itemValue === currentValue;
  };

  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="w-1/4 h-10">
          <input
            className="align-middle"
            type="checkbox"
            id={`${groupName}-${index}`}
            name={groupName}
            value={item.value}
            defaultChecked={isChecked(item.value)}
            onChange={(e) => handleCheckbox({ event: e, groupName, multiple, form, item, index })}
          />
          <label
            className="ml-2 align-middle text-xs"
            htmlFor={`${groupName}-${index}`}
          >
            {item.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckBoxes;
