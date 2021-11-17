import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const bg = props.backgroundColor ? "bg-" + props.backgroundColor : "bg-white";
  const type = props.type ? "type-" + props.type : "";
  return (
    <button
      className={`btn ${bg} ${type}`}
      onClick={props.onClick ? () => props.onClick() : null}
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
};

export default Button;
