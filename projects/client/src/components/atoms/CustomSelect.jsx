import React from "react";
import ReactSelect from "react-select";

const CustomSelect = ({ isInvalid,...config }) => {
//     console.log(isInvalid)
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: !isInvalid ? (state.isFocused ? 'blue' : 'inherit') : 'red',
    }),
  };

  return (
    <ReactSelect
      {...config}
      menuPortalTarget={document.querySelector("body")}
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={customStyles}
    ></ReactSelect>
  );
};

export default CustomSelect;
