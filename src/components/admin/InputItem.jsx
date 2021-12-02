import React from "react";
import PropTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const InputItem = (props) => {
  const searchbox = props.searchbox ? "search-box" : "";
  let inputType = "";
  switch (props.type) {
    case "textarea":
      inputType = (
        <textarea
          onChange={props.onChange}
          name={props.name}
          value={props.value}
        />
      );
      break;
    case "radio":
      inputType = (
        <div className="check-radio">
          <input
            className={`${props.type}`}
            onChange={props.onChange}
            type={props.type}
            name={props.name}
            value={props.valueNumber ? props.valueNumber : props.value}
            checked={props.checked}
            placeholder={props.placeholder}
          />
          <span>{props.labelRadio ? props.labelRadio : ""}</span>
        </div>
      );
      break;
    case "ckedit":
      inputType = (
        <CKEditor
          editor={ClassicEditor}
          data={props.value}
          onChange={(event, editor) => {
            const data = editor.getData();
            props.onChange(data);
          }}
        />
      );
      break;

    default:
      inputType = (
        <input
          className={`${props.type}`}
          onChange={props.onChange}
          type={props.type}
          name={props.name}
          value={props.valueNumber ? props.valueNumber : props.value}
          checked={props.checked}
          placeholder={props.placeholder}
        />
      );
  }
  return (
    <div className={`input-item-admin ${searchbox}`}>
      <label>{props.label}</label>
      {inputType}
      <span>{props.message}</span>
      {props.searchbox ? <i className="bx bx-search-alt-2"></i> : ""}
      {props.type === "file" ? (
        <div className="icon-file">
          <i className="bx bx-archive-out"></i>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

InputItem.propTypes = {
  label: PropTypes.string,
  labelRadio: PropTypes.string,

  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  valueNumber: PropTypes.number,
  message: PropTypes.array,
  searchbox: PropTypes.bool,
  checked: PropTypes.bool,
};

export default InputItem;
