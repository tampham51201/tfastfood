import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const bg = props.backgroundColor ? "bg-" + props.backgroundColor : "bg-white";
  const size = props.size ? "size-" + props.size : "";

  const type = props.type ? "type-" + props.type : "";
  return (
    <button
      className={`btn ${bg} ${type} ${size}`}
      onClick={props.onClick ? () => props.onClick() : null}
      type={props.type === "submit" ? "submit" : "button"}
    >
      {props.icon ? (
        <span className="btn-icon">
          <i className={props.icon}></i>
        </span>
      ) : null}
      <span className="btn-txt">{props.children}</span>
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
};

export default Button;
