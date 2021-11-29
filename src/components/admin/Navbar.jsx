import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="navbar__search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything" />
        </div>
        <div className="navbar__right">
          <div className="navbar__right__item">
            <i className="bx bxs-bell"></i>
            <div className="navbar__right__item__quantity">4</div>
          </div>
          <div className="navbar__right__item">
            <i className="bx bxs-envelope"></i>
            <div className="navbar__right__item__quantity">4</div>
          </div>
          <div className="navbar__right__profile">
            <div className="navbar__right__profile__logo">
              <i className="bx bx-user"></i>
            </div>
            tampham512
            <i className="bx bx-chevron-down"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
