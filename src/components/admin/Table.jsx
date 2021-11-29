import React from "react";
import PropTypes from "prop-types";

const Table = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {props.coloums.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};

Table.propTypes = {
  coloums: PropTypes.array.isRequired,
};

export default Table;
