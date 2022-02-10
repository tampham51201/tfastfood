import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redux/user/userSlice";

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
  {
    display: "Khuyến Mãi",
    path: "/admin/discount",
    icon: "bx bx-basket",
  },
  {
    display: "Banner",
    path: "/admin/banner",
    icon: "bx bx-category",
  },
  {
    display: "Thiết Lập Thông Tin",
    path: "/admin/info-shop",
    icon: "bx bx-category",
  },
];

const SideBar = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(getUser());
  }, [dispatch]);
  var user = useSelector((state) => state.users.value);
  var sidebar = [];
  console.log(user);
  if (user !== null && user.data !== "") {
    if (user.data.user.role_as == 2) {
      sidebar = [
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
        {
          display: "Khuyến Mãi",
          path: "/admin/discount",
          icon: "bx bx-basket",
        },
        {
          display: "Banner",
          path: "/admin/banner",
          icon: "bx bx-category",
        },
        {
          display: "Thiết Lập Thông Tin",
          path: "/admin/info-shop",
          icon: "bx bx-category",
        },
      ];
    } else {
      sidebar = [
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
        {
          display: "Khuyến Mãi",
          path: "/admin/discount",
          icon: "bx bx-basket",
        },
        {
          display: "Banner",
          path: "/admin/banner",
          icon: "bx bx-category",
        },
      ];
    }
  }

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
