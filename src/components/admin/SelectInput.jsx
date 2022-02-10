import React from "react";
import PropTypes from "prop-types";

const SelectInput = (props) => {
  return (
    <div className="input-item-admin">
      <label>{props.label}</label>
      <select
        name={props.name}
        value={props.value}
        onChange={props.onChange ? props.onChange : null}
      >
        <option value={-1}>Chọn</option>
        {props.data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <span>{props.message}</span>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,

  onChange: PropTypes.func,
  data: PropTypes.array,
  message: PropTypes.string,
};

export default SelectInput;
