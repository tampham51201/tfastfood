import React from "react";

import { Route, Switch } from "react-router";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";

import Categorys from "../pages/admin/Categorys/Categorys";
import AddCategory from "../pages/admin/Categorys/AddCategory";
import EditCategory from "../pages/admin/Categorys/EditCategory";

import Products from "../pages/admin/Products/Products";
import EditProduct from "../pages/admin/Products/EditProduct";
import AddProduct from "../pages/admin/Products/AddProduct";

import Orders from "../pages/admin/Orders";

const RoutersAdmin = () => {
  return (
    <Switch>
      <Route exact path="/admin/doahboard" component={Dashboard} />
      <Route path="/admin/user" component={Users} />

      <Route path="/admin/add-category" component={AddCategory} />
      <Route path="/admin/edit-category/:id" component={EditCategory} />
      <Route path="/admin/category" component={Categorys} />

      <Route path="/admin/product" component={Products} />
      <Route path="/admin/edit-product/:id" component={EditProduct} />
      <Route path="/admin/add-product" component={AddProduct} />

      <Route path="/admin/order" component={Orders} />

      {/* <Redirect from="/admin" to="/admin/doahboard" /> */}
    </Switch>
  );
};

export default RoutersAdmin;
