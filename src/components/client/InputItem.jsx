import React, { useRef } from "react";
import PropTypes from "prop-types";

const InputItem = (props) => {
  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const boxRef = useRef(null);

  const handleFocus = () => {
    iconRef.current.classList.add("focus");
    boxRef.current.classList.add("focus");
  };
  const handleBlur = () => {
    if (inputRef.current.value === "") {
      iconRef.current.classList.remove("focus");
      boxRef.current.classList.remove("focus");
    }
  };

  return (
    <div className="input-item">
      <label>{props.label}</label>
      <div className="input-item__box" ref={boxRef}>
        <i className={props.icon} ref={iconRef} />
        <input
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={props.onChange}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
        />
        <span>{props.message}</span>
      </div>
    </div>
  );
};

InputItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  message: PropTypes.array,
};

export default InputItem;
