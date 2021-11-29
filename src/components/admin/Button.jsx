import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const size = props.size ? "btn-" + props.size : "";
  const bg = props.bg ? "bg-" + props.bg : "";

  return (
    <button
      className={`btn-admin ${size} ${bg}`}
      type={props.submit ? "submit" : "button"}
      onClick={props.onClick ? (e) => props.onClick(e) : null}
    >
      {props.icon ? (
        <span className="btn-admin__icon">
          <i className="bx bx-plus"></i>
        </span>
      ) : (
        ""
      )}
      <span className="btn-admin__txt">{props.children}</span>
    </button>
  );
};

Button.propTypes = {
  submit: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.bool,
  size: PropTypes.string,
  bg: PropTypes.string,
};

export default Button;
