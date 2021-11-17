import React from "react";

import { Route, Switch } from "react-router";

import Cart from "../pages/Cart";
import Category from "../pages/Category";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Product from "../pages/Product";
import Register from "../pages/Register";

const Routers = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/category/:slug" component={Product} />
      <Route path="/category" component={Category} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
};

export default Routers;
