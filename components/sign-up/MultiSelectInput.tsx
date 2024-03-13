import React from "react";
import Select, { ActionMeta } from "react-select";
import { StylesConfig } from "react-select";
import customStyles from "./selectCustomStyles";

interface MultiSelectInputProps {
  name: string;
  options: { value: number; label: string }[];
  skillIds: number[];
  onSelectedOptionsChange: (skillIds: number[]) => void;
  isMulti: boolean;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  name,
  options,
  skillIds,
  onSelectedOptionsChange,
}) => {
  const handleSelectChange = (
    selectedValues: { value: number; label: string }[] | null,
    actionMeta: ActionMeta<{ value: number; label: string }>
  ) => {
    if (selectedValues) {
      const selectedOptionValues = selectedValues.map((option) => option.value);
      onSelectedOptionsChange(selectedOptionValues as number[]); // Use 'as' assertion
    } else {
      onSelectedOptionsChange([]);
    }
  };

  return (
    <div className="w-96 h-12">
      <Select
        isMulti
        options={options}
        name={name}
        value={options.filter((option) => skillIds.includes(option.value))}
        onChange={handleSelectChange as any}
        styles={customStyles}
      />
    </div>
  );
};

export default MultiSelectInput;
