import React from "react";
import ReactSelect from "react-select";

const CustomSelect = ({ isInvalid, ...config }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: !isInvalid ? (state.isFocused ? "blue" : "inherit") : "red",
    }),
  };

  return (
    <ReactSelect
      {...config}
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={customStyles}
    ></ReactSelect>
  );
};

export default CustomSelect;
