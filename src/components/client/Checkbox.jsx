import React from "react";
import PropTypes from "prop-types";

const Checkbox = (props) => {
  return (
    <div className="checkbox">
      <label>
        <input type="checkbox" />
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
