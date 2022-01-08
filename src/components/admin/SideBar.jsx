import React from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const sidebar = [
  {
    display: "Tổng Quan",
    path: "/admin/doahboard",
    icon: "bx bx-line-chart",
  },
  {
    display: "Người Dùng",
    path: "/admin/user",
    icon: "bx bxs-user-account",
  },
  {
    display: "Danh Mục",
    path: "/admin/category",
    icon: "bx bx-category",
  },
  {
    display: "Sản Phẩm",
    path: "/admin/product",
    icon: "bx bx-category",
  },
  {
    display: "Đơn Hàng",
    path: "/admin/order",
    icon: "bx bx-basket",
  },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">ADMIN MASTER</div>
      <div className="sidebar__list">
        {sidebar.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              className={`sidebar__list__item  ${
                location.pathname.includes(item.path) ? "active" : ""
              }`}
            >
              <i className={item.icon}></i>
              {item.display}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
