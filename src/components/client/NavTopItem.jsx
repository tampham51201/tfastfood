import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavTopItem = (props) => {
  const listRef = useRef(null);
  const handleClick = () => {
    listRef.current.classList.toggle("active");
  };
  return (
    <div className="header__top-nav__right__item" onClick={handleClick}>
      <i className={`${props.icon} header__top-nav__right__item__icon`}></i>
      <p>{props.children}</p>
      {props.icondown ? "" : <i className="bx bx-chevron-down"></i>}
      {props.data ? (
        <ul className="header__top-nav__right__item__list" ref={listRef}>
          {props.data.map((item, index) => (
            <li
              className="header__top-nav__right__item__list__item"
              key={index}
              onClick={props.onClick ? () => props.onClick(item.name) : null}
            >
              <Link to={item.path} key={index}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

NavTopItem.propTypes = {
  data: PropTypes.array,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  icondown: PropTypes.bool,
};

export default NavTopItem;
