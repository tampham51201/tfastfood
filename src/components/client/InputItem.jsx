import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

const InputItem = (props) => {
  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const boxRef = useRef(null);
  const iconPassRef = useRef(null);

  <i class="bx bx-show-alt"></i>;

  const [type, setType] = useState(props.type);

  const handleHideShow = () => {
    iconPassRef.current.classList.remove("bx-show-alt");
    iconPassRef.current.classList.remove("bx-low-vision");

    if (type === "password") {
      const newtype = "text";
      iconPassRef.current.classList.add("bx-show-alt");
      setType(newtype);
    } else {
      const newtypePass = "password";
      iconPassRef.current.classList.add("bx-low-vision");
      setType(newtypePass);
    }
  };

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
          type={type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
        />
        {props.type === "password" ? (
          <i
            className="bx bx-low-vision hide-eye"
            ref={iconPassRef}
            onClick={handleHideShow}
            style={{ cursor: "pointer" }}
          ></i>
        ) : (
          ""
        )}
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
