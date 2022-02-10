import React from "react";

import { Route, Switch, Redirect } from "react-router";

import Dashboard from "../pages/admin/Dashboard";

import Users from "../pages/admin/Users/Users";
import AddUser from "../pages/admin/Users/AddUser";
import EditUser from "../pages/admin/Users/EditUser";

import Categorys from "../pages/admin/Categorys/Categorys";
import AddCategory from "../pages/admin/Categorys/AddCategory";
import EditCategory from "../pages/admin/Categorys/EditCategory";

import Products from "../pages/admin/Products/Products";
import EditProduct from "../pages/admin/Products/EditProduct";
import AddProduct from "../pages/admin/Products/AddProduct";

import Orders from "../pages/admin/Order/Orders";
import OrderDetail from "../pages/admin/Order/OrderDetail";

import Banner from "../pages/admin/Banner/Banner";
import EditBanner from "../pages/admin/Banner/EditBanner";
import AddBanner from "../pages/admin/Banner/AddBanner";

import Discounts from "../pages/admin/Discounts/Discounts";
import AddDiscount from "../pages/admin/Discounts/AddDiscount";
import EditDiscount from "../pages/admin/Discounts/EditDiscount";

import InfoShop from "../pages/admin/InfoShop/InfoShop";

const RoutersAdmin = () => {
  return (
    <Switch>
      <Route exact={true} path="/admin/doahboard" component={Dashboard} />
      <Route exact={true} path="/admin/user" component={Users} />
      <Route exact={true} path="/admin/user-add" component={AddUser} />
      <Route exact={true} path="/admin/user-edit/:id" component={EditUser} />

      <Route exact={true} path="/admin/category-add" component={AddCategory} />
      <Route
        exact={true}
        path="/admin/category-edit/:id"
        component={EditCategory}
      />
      <Route exact={true} path="/admin/category" component={Categorys} />

      <Route exact={true} path="/admin/product" component={Products} />
      <Route
        exact={true}
        path="/admin/product-edit/:id"
        component={EditProduct}
      />
      <Route exact={true} path="/admin/product-add" component={AddProduct} />

      <Route exact={true} path="/admin/order" component={Orders} />

      <Route
        exact={true}
        path="/admin/details-order/:id"
        component={OrderDetail}
      />
      <Route exact={true} path="/admin/banner" component={Banner} />

      <Route exact={true} path="/admin/banner-add" component={AddBanner} />

      <Route
        exact={true}
        path="/admin/banner-edit/:id"
        component={EditBanner}
      />

      <Route exact={true} path="/admin/discount" component={Discounts} />

      <Route exact={true} path="/admin/discount-add" component={AddDiscount} />

      <Route
        exact={true}
        path="/admin/discount-edit/:id"
        component={EditDiscount}
      />

      <Route exact={true} path="/admin/info-shop" component={InfoShop} />

      <Redirect from="/admin" to="/admin/doahboard" />
    </Switch>
  );
};

export default RoutersAdmin;
