import React, { useRef } from "react";
import PropTypes from "prop-types";

const Checkbox = (props) => {
  const inputRef = useRef(null);
  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };
  return (
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          ref={inputRef}
          checked={props.checked}
          onChange={onChange}
        />
        {props.label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
};

export default Checkbox;
